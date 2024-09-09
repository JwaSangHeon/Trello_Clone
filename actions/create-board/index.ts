"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/org-limit";
import { checkSubscirption } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "로그인되지 않았습니다.",
    };
  }

  const canCreate = await hasAvailableCount();
  const isPro = await checkSubscirption();

  if (!canCreate && !isPro) {
    return {
      error:
        "무료로 생성 가능한 board의 갯수가 끝났습니다. 요금제를 업그레이드 해주세요.",
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] =
    image.split("|");

  console.log();

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHtml ||
    !imageUserName
  ) {
    return {
      error: "실패했습니다.",
    };
  }

  console.log({
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHtml,
    imageUserName,
  });

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHtml,
      },
    });

    if (!isPro) {
      await incrementAvailableCount();
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "생성에 실패했습니다.",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
