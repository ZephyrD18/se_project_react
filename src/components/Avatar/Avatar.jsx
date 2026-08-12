function Avatar({
  name = "",
  avatarUrl = "",
  imageClassName,
  placeholderClassName,
}) {
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedAvatarUrl =
    typeof avatarUrl === "string" ? avatarUrl.trim() : "";
  const initial = trimmedName.charAt(0).toUpperCase() || "?";
  const accessibleName = trimmedName || "User";

  if (trimmedAvatarUrl) {
    return (
      <img
        src={trimmedAvatarUrl}
        alt={`${accessibleName}'s avatar`}
        className={imageClassName}
      />
    );
  }

  return (
    <span
      className={placeholderClassName}
      role="img"
      aria-label={`${accessibleName}'s avatar`}
    >
      {initial}
    </span>
  );
}

export default Avatar;
