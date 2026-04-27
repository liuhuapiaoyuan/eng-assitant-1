import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PenTool, CheckCircle2, AlertTriangle, MessageSquare, Sparkles, UserCircle2, Mic, Settings, PlayCircle, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { GoogleGenAI } from "@google/genai";

export default function EssayReview() {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceComment, setVoiceComment] = useState("");

  const handleRecordToggle = async () => {
    if (isRecording) {
      setIsRecording(false);
      setVoiceComment("识别并润色中...");
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = "你是一个英语老师。这是一段语音识别出的原始评语口语：'写的非常棒，时态和拼写都有很大进步，可以继续保持不过要注意一般现在时的主谓一致, 比如 are play 这里。'。请帮我稍微扩写并润色成一段正式的对于初中生的作文教师评语（中文即可，可以夹杂少量英文鼓励），语气要亲切鼓励。直接输出文本内容。";
        
        const response = await ai.models.generateContent({
           model: 'gemini-3-flash-preview',
           contents: prompt
        });
        setVoiceComment(response.text || "语音已转写：写的非常棒！时态和拼写都有很大进步，继续保持！");
      } catch (e) {
        setVoiceComment("转写服务不可用，请稍后再试。");
      }
    } else {
      setIsRecording(true);
      setVoiceComment("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center pr-4 bg-white p-4 rounded-xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
        <div>
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none mb-2">待复核 (系统已打分 85)</Badge>
          <h1 className="text-xl font-bold text-slate-900">批改作文：张小明 - My New Friend</h1>
        </div>
        <div className="text-right flex gap-3 items-center">
          <Button variant="outline" className="text-slate-600">打回重写</Button>
          <Button className="bg-indigo-600 text-white">完成批改并发布</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Essay Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4 rounded-t-2xl">
              <CardTitle className="text-base flex items-center gap-2">
                <PenTool className="w-4 h-4 text-slate-500" />
                学生原文 (含 AI 标记)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-slate-800 text-lg leading-loose font-medium font-serif">
              Hello everyone. Standard my new friend. <span className="bg-red-100 border-b-2 border-red-400 pb-0.5 cursor-help" title="语法错误：应为 His name is">He name is</span> Tom. He is 13 years old. He <span className="bg-red-100 border-b-2 border-red-400 pb-0.5 cursor-help" title="语法错误：主语第三人称单数，拼写">come form</span> America. He is tall and strong. He <span className="bg-yellow-100 border-b-2 border-yellow-400 pb-0.5 cursor-help" title="表达优化：has short black hair 更自然。">have short hair and black hair</span>. 
              <br/><br/>
              He likes playing basketball and reading books. We often <span className="bg-red-100 border-b-2 border-red-400 pb-0.5 cursor-help" title="时态错误：一般现在时，不需要 be 动词">are play</span> together after school. I like him very much.
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI Feedback & Teacher Override */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-0">
            <CardContent className="p-5">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-indigo-400"><Sparkles className="w-5 h-5"/> AI 评分与建议</h3>
              <div className="grid grid-cols-4 gap-2 text-center mb-6 border-b border-slate-700 pb-4">
                 <div><div className="text-2xl font-bold">9</div><div className="text-xs text-slate-400">内容 (10)</div></div>
                 <div><div className="text-2xl font-bold">8.5</div><div className="text-xs text-slate-400">结构 (10)</div></div>
                 <div><div className="text-2xl font-bold text-orange-400">6</div><div className="text-xs text-slate-400">语法 (10)</div></div>
                 <div><div className="text-2xl font-bold">7</div><div className="text-xs text-slate-400">词汇 (10)</div></div>
              </div>
              <ul className="text-sm space-y-2 text-slate-300">
                <li className="flex gap-2"><div className="text-red-400 mt-0.5">•</div> 发现 3 处主谓一致/人称代词错误</li>
                <li className="flex gap-2"><div className="text-yellow-400 mt-0.5">•</div> 发现 1 处多余 be 动词</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b border-slate-50">
              <CardTitle className="text-lg flex justify-between items-center">
                 <span>教师人工评价</span>
                 <Badge variant="outline" className="text-indigo-600 bg-indigo-50 border-indigo-200">综合得分: 85 (A-)</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-slate-700">评语</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={cn("h-8 gap-2 rounded-full transition-colors", isRecording ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700" : "text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700")}
                    onClick={handleRecordToggle}
                  >
                    {isRecording ? <><Square className="w-3 h-3 fill-current" /> 停止录音 (识别中...)</> : <><Mic className="w-3 h-3" /> 语音输入评价</>}
                  </Button>
                </div>
                
                <div className="relative">
                  <Textarea 
                    className="min-h-[120px] text-sm resize-none focus-visible:ring-indigo-500 bg-slate-50"
                    placeholder="在这里输入你的评语，或者使用上方的语音输入..."
                    value={voiceComment}
                    onChange={(e) => setVoiceComment(e.target.value)}
                  />
                  {isRecording && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center">
                       <span className="flex gap-1">
                         <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></span>
                         <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{animationDelay: "150ms"}}></span>
                         <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></span>
                       </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-sm flex gap-3 items-center">
                <Settings className="w-8 h-8 text-indigo-400 shrink-0" />
                <p className="text-slate-600">
                  <strong className="text-indigo-700">AI 提示：</strong>你可以直接通过语音下达指令，例如：“帮我夸奖他的词汇使用，但提醒他一定要注意第三人称单数加 s”。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
