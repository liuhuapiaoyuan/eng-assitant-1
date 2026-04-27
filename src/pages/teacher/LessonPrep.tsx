import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Save, Download, FileText, CheckCircle2 } from "lucide-react";
import MDEditor from '@uiw/react-md-editor';
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

export default function LessonPrep() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [aiContent, setAiContent] = useState("");

  const generatePlan = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `你是一位经验丰富的初中英语教研员。请为《仁爱版》初中英语 七年级上册 Unit 1 Topic 1 Section A 设计一份高质量的详细教案。重点侧重于词汇教学和口语交际。
输出要求：
1. 直接输出 Markdown 格式的完整教案。
2. 包含：教学目标（知识、技能、情感）、教学重难点、教学过程（导入、呈现、操练、巩固、作业）。`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAiContent(response.text || "AI没有返回任何内容");
      setHasResult(true);
    } catch (e) {
      console.error(e);
      setAiContent("生成失败，请检查 API 配置或网络连接。 \n\n" + String(e));
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
          <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100/50 rounded-full translate-x-8 -translate-y-8"></div>
             <CardTitle className="text-lg relative z-10 font-bold text-slate-800">AI 备课参数配置</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">教材内容</label>
              <Select defaultValue="sec_a">
                <SelectTrigger>
                  <SelectValue placeholder="选择 Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sec_a">Unit 1 Topic 1 Section A</SelectItem>
                  <SelectItem value="sec_b">Unit 1 Topic 1 Section B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">重点侧重</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="border-indigo-500 bg-indigo-50 text-indigo-700 justify-start h-auto py-2 px-3">
                  <CheckCircle2 className="w-3 h-3 mr-2" /> 词汇教学
                </Button>
                <Button variant="outline" className="text-slate-600 justify-start h-auto py-2 px-3">语法解析</Button>
                <Button variant="outline" className="border-indigo-500 bg-indigo-50 text-indigo-700 justify-start h-auto py-2 px-3">
                  <CheckCircle2 className="w-3 h-3 mr-2" /> 口语交际
                </Button>
                <Button variant="outline" className="text-slate-600 justify-start h-auto py-2 px-3">阅读理解</Button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">融合学情 (可选)</label>
              <Select defaultValue="class1">
                <SelectTrigger>
                  <SelectValue placeholder="选择班级分析数据" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class1">七年级1班 (基础较弱)</SelectItem>
                  <SelectItem value="class2">七年级2班 (口语薄弱)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500 leading-relaxed">系统将结合该班级近期的错题和能力雷达，自动调整教案难度和互动设计。</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">生成类型</label>
              <Select defaultValue="plan">
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plan">完整教案 (Lesson Plan)</SelectItem>
                  <SelectItem value="ppt">课件提纲 (PPT Outline)</SelectItem>
                  <SelectItem value="activity">课堂活动设计</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 font-bold" 
              size="lg"
              onClick={generatePlan}
              disabled={isGenerating}
            >
              {isGenerating ? "AI 正在生成中..." : <><Sparkles className="w-4 h-4 mr-2" /> 一键生成教案</>}
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
                <FileText className="w-5 h-5 text-indigo-600" />
                <h2 className="font-bold text-slate-800">Unit 1 Topic 1 Section A 完整教案</h2>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Save className="w-4 h-4 mr-2"/> 保存到备课本</Button>
                <Button size="sm" className="bg-slate-900"><Download className="w-4 h-4 mr-2"/> 导出 Word</Button>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-auto">
              {/* Markdown Editor View */}
              <div className="max-w-4xl mx-auto space-y-6" data-color-mode="light">
                <MDEditor
                  value={aiContent}
                  onChange={(val) => setAiContent(val || '')}
                  height={600}
                  previewOptions={{
                    style: { padding: '20px' }
                  }}
                  className="shadow-none border border-slate-200 hide-toolbar-lines"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Sparkles className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg">在左侧配置参数后，点击"一键生成教案"</p>
          </div>
        )}
      </div>
    </div>
  );
}
