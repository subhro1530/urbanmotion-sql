export default function handler(req, res) {
    if (req.method === "POST") {
      // Process rental order
      res.status(200).json({ message: "Rental order placed successfully" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }