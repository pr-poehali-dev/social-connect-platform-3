import { useState } from "react";
import { Post } from "../types";
import { INITIAL_POSTS } from "../data/posts";

export function usePosts(searchQuery: string) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState("");

  const handleLike = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)));
  };

  const handleRepost = (id: number, comment: string) => {
    const original = posts.find((p) => p.id === id);
    if (!original) return;
    const newPost: Post = {
      id: Date.now(),
      author: "Вы",
      handle: "you",
      time: "сейчас",
      text: comment || "Поделился постом",
      likes: 0,
      reposts: 0,
      comments: 0,
      liked: false,
      reposted: false,
      saved: false,
      repostOf: { author: original.author, handle: original.handle, text: original.text },
    };
    setPosts((prev) => [newPost, ...prev.map((p) => (p.id === id ? { ...p, reposted: true } : p))]);
  };

  const handleSave = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)));
  };

  const handlePublish = () => {
    if (!newPostText.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      author: "Вы",
      handle: "you",
      time: "сейчас",
      text: newPostText,
      likes: 0,
      reposts: 0,
      comments: 0,
      liked: false,
      reposted: false,
      saved: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setNewPostText("");
  };

  const filteredPosts = searchQuery
    ? posts.filter(
        (p) =>
          p.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.tag && p.tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : posts;

  const savedPosts = posts.filter((p) => p.saved);

  return {
    posts,
    newPostText,
    setNewPostText,
    filteredPosts,
    savedPosts,
    handleLike,
    handleRepost,
    handleSave,
    handlePublish,
  };
}
