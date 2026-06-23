// Factory function — call it with an array of allowed roles.
// Usage in routes: router.get("/secret", checkRole(["admin", "moderator"]), handler)
// authMiddleware MUST run before this to populate req.user.
function checkRole(allowedRoles = []) {
  return function (req, res, next) {
    // Safety: authMiddleware should have already set req.user
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userRole = req.user.role;

    if (!userRole) {
      // Role missing from JWT — token was signed before the role field was added.
      // Ask the user to log in again so a fresh token (with role) is issued.
      return res.status(403).json({
        message:
          "Access denied: token has no role. Please log in again to refresh your session.",
      });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Access denied: requires one of [${allowedRoles.join(", ")}], but your role is '${userRole}'`,
      });
    }

    next(); // role is allowed — proceed
  };
}

module.exports = checkRole;
