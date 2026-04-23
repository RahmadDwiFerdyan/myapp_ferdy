// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from "@/utils/db/servicefirebase";
import type { NextApiRequest, NextApiResponse } from "next";

type RegisterResponse = {
  status: "success" | "error";
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>
) {
  if (req.method === "POST") {
    const result = await signUp(req.body);

    if (result.status === "success") {
      return res.status(201).json({
        status: "success",
        message: result.message,
      });
    }

    const httpStatus =
      result.errorCode === "VALIDATION"
        ? 400
        : result.errorCode === "ALREADY_EXISTS"
          ? 409
          : 500;

    return res.status(httpStatus).json({
      status: "error",
      message: result.message,
    });
  } else {
    return res.status(405).json({
      status: "error",
      message: "Method not allowed",
    });
  }
}