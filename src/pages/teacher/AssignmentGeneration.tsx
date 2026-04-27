import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Send, Eye, PenTool, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

export default function AssignmentGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [aiContent, setAiContent] = useState("");

  const generateAssignment = async () => {
    setIsGenerating(true);
    try {
      // NOTE: Using process.env.GEMINI_API_KEY as per the rules for AI Studio preview
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `你是一位初中英语高级教师。请根据《仁爱版》初中英语教材 七年级上册 Unit 1 Topic 1，生成一份分层作业。直接输出 Markdown 格式的纯文本，不要有多余的客套话。
包含：
## 基础篇（适合大部分学生）
1. 单词和短语测试
2. 基础语法句型补全

## 拔高篇（适合A班学生）
1. 短文阅读（符合该单元的交际语境）
2. 语法拓展选词填空`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAiContent(response.text || "AI没有返回任何内容");
      setHasResult(true);
    } catch (e) {
      console.error(e);
      setAiContent("生成失败，请检查 API 配置或网络连接。 \n\n```" + String(e) + "```");
      setHasResult(true);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-8rem)] gap-6">
      {/* Left Column: Configuration */}
      <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto shrink-0">
        <Card className="flex-1">
          <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50">
             <CardTitle className="text-lg font-bold text-slate-800">作业生成参数</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">教材范围</label>
              <Select defaultValue="top1">
                <SelectTrigger>
                  <SelectValue placeholder="选择教材范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top1">七年级上册 Unit 1 Topic 1</SelectItem>
                  <SelectItem value="top2">七年级上册 Unit 1 Topic 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">作业题型</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 cursor-pointer text-sm py-1">单词默写</Badge>
                <Badge variant="outline" className="text-slate-600 hover:bg-slate-100 cursor-pointer text-sm py-1">单项选择</Badge>
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 cursor-pointer text-sm py-1">语法填空</Badge>
                <Badge variant="outline" className="text-slate-600 hover:bg-slate-100 cursor-pointer text-sm py-1">短文写作</Badge>
                <Badge variant="outline" className="text-slate-600 hover:bg-slate-100 cursor-pointer text-sm py-1">综合阅读</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">分层策略 (难度差异)</label>
              <Select defaultValue="layered">
                <SelectTrigger>
                  <SelectValue placeholder="选择分层策略" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="layered">基础/提升/拔高 (自动生成3份)</SelectItem>
                  <SelectItem value="basic">仅基础练习</SelectItem>
                  <SelectItem value="advanced">仅拔高训练</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">发布班级</label>
              <Select defaultValue="c1">
                <SelectTrigger>
                  <SelectValue placeholder="选择班级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="c1">七年级 1 班 (系统将自动匹配分层组)</SelectItem>
                  <SelectItem value="c2">七年级 2 班</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">截止时间</label>
              <Input type="datetime-local" defaultValue="2024-03-01T22:00" className="text-sm" />
            </div>

            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 font-bold mt-4" 
              size="lg"
              onClick={generateAssignment}
              disabled={isGenerating}
            >
              {isGenerating ? "题目生成中..." : <><Sparkles className="w-4 h-4 mr-2" /> AI 题库组卷</>}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Generation Result */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        {hasResult ? (
          <>
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-indigo-600" />
                <h2 className="font-bold text-slate-800">Unit 1 Topic 1 巩固练习 (分层)</h2>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 ml-2 border-none">生成成功</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-2"/> 学生视角预览</Button>
                <Button size="sm" className="bg-slate-900"><Send className="w-4 h-4 mr-2"/> 一键发布到班级</Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-0">
               <div className="bg-slate-50 border-b border-slate-100 p-3 flex justify-center gap-4 sticky top-0 z-10 shadow-sm">
                 <Button variant="secondary" className="bg-white border text-indigo-600 shadow-sm">基础篇 (适合 15 人)</Button>
                 <Button variant="ghost" className="text-slate-500">提升篇 (适合 25 人)</Button>
                 <Button variant="ghost" className="text-slate-500">拔高篇 (适合 10 人)</Button>
               </div>
               
               {/* Paper Content */}
               <div className="max-w-3xl mx-auto p-8">
                 <div className="prose prose-indigo max-w-none prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b-2 prose-h2:border-indigo-100 prose-h2:pb-2">
                   {aiContent ? (
                     <Markdown>{aiContent}</Markdown>
                   ) : (
                     <p className="text-slate-500 italic">No content generated.</p>
                   )}
                 </div>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Sparkles className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg">配置参数后，点击"AI 题库组卷"</p>
          </div>
        )}
      </div>
    </div>
  );
}
