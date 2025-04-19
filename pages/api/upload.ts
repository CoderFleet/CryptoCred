import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import crypto from "crypto";
import FormData from "form-data";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const data: any = await new Promise((resolve, reject) => {
        const form = formidable({ multiples: false });
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });

    const files = (data as any).files;
    console.log(files);
    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!uploadedFile?.filepath) {
        return res.status(400).json({ error: "No file uploaded or file path missing" });
    }

    const buffer = fs.readFileSync(uploadedFile.filepath);
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");

    const formData = new FormData();
    formData.append("file", fs.createReadStream(uploadedFile.filepath));

    const verbRes = await fetch("https://api.verbwire.com/v1/nft/mint/file", {
        method: "POST",
        headers: {
            "X-API-Key": process.env.VERBWIRE_API_KEY!,
            ...formData.getHeaders(),
        },
        body: formData as any,
    });

    const mintResult = await verbRes.json();

    return res.status(200).json({
        hash,
        mintResult,
    });
}
