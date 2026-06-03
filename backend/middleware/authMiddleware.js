import jwt from "jsonwebtoken";

export const isAdmin = async (req, res, next) => {
  try {
    // GET TOKEN
    const authHeader = req.headers.authorization;

    // CHECK TOKEN
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No Token Found",
      });
    }

    // REMOVE "Bearer "
    const token = authHeader.split(" ")[1];

    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
