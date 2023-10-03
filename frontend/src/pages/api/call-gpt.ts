import type { NextApiRequest, NextApiResponse } from "next";
import Metaphor from "metaphor-node"

const metaphor = new Metaphor("3ffeaa1e-c0dd-4a9f-a86a-25a9dbfac823")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { companyName } = req.body;
    const response = await metaphor.search(`Here is a portfolio of a designer who works at ${companyName}`, {
      numResults: 10,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}