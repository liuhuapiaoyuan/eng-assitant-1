import { BookText, SpellCheck, Mic2, Settings, BookOpen, Star } from "lucide-react";

export const sections = [
    {
      id: "A",
      title: "Section A",
      desc: "问候与介绍",
      progress: 100,
      status: "completed",
      modules: [
        { name: "课文学习", icon: BookText, done: true },
        { name: "重点词汇", icon: SpellCheck, done: true },
        { name: "口语跟读", icon: Mic2, done: true },
      ]
    },
    {
      id: "B",
      title: "Section B",
      desc: "感谢与致歉",
      progress: 65,
      status: "in-progress",
      modules: [
        { name: "课文学习", icon: BookText, done: true },
        { name: "重点词汇", icon: SpellCheck, done: false },
        { name: "口语跟读", icon: Mic2, done: false },
      ]
    },
    {
      id: "C",
      title: "Section C",
      desc: "告别与祝愿",
      progress: 0,
      status: "locked",
      modules: [
        { name: "课文学习", icon: BookText, done: false },
        { name: "重点词汇", icon: SpellCheck, done: false },
        { name: "基础语法", icon: Settings, done: false },
      ]
    },
    {
      id: "D",
      title: "Section D",
      desc: "复习与写作",
      progress: 0,
      status: "locked",
      modules: [
        { name: "综合阅读", icon: BookOpen, done: false },
        { name: "写作训练", icon: Star, done: false },
      ]
    }
  ];