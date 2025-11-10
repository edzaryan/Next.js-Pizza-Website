
export function getUserAvatar(imageUrl?: string | null | undefined, fallback = "/default-user-avatar.png") {
  return imageUrl || fallback;
}