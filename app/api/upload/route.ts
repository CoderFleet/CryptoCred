import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import crypto from "crypto";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const data = await new Promise((resolve, reject) => {
    const form = formidable();
    form.parse(req, (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const file = data.files.file[0];
  const buffer = fs.readFileSync(file.filepath);
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");

  const formData = new FormData();
  formData.append("file", fs.createReadStream(file.filepath));

  const res = await fetch("https://api.verbwire.com/v1/nft/mint/file", {
    method: "POST",
    headers: {
      "X-API-Key": process.env.VERBWIRE_API_KEY!,
    },
    body: formData as any,
  });

  const result = await res.json();

  return NextResponse.json({
    hash,
    mintResult: result,
  });
}
