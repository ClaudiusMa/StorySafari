import type { NextApiRequest, NextApiResponse } from "next";
import Metaphor from "metaphor-node"

const metaphor = new Metaphor(process.env.METAPHOR_API_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle POST request
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
  } else {
    // Handle other methods or return an error
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}