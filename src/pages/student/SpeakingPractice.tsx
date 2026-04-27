import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, Mic, RotateCcw, ChevronRight, CheckCircle2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

export default function SpeakingPractice() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      setIsAnalyzing(true);
      setHasResult(false);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `你是一个英语发音教练。学生正在练习跟读："Where are you from?"。
请模拟一份发音分析反馈，假设学生在 "you" 这个词的元音发音上不够饱满。
只要输出纯文本的简短一句纠音建议。`;
        const response = await ai.models.generateContent({
           model: 'gemini-3-flash-preview',
           contents: prompt
        });
        setAiFeedback(response.text || "单词 you 的元音发音不够饱满，注意嘴型稍微收圆一点。");
      } catch (e) {
        setAiFeedback("单词 you 的元音发音不够饱满，注意嘴型稍微收圆一点。");
      } finally {
        setIsAnalyzing(false);
        setHasResult(true);
      }
    } else {
      setIsRecording(true);
      setHasResult(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-slate-900">口语跟读练习</h1>
        <Badge variant="outline" className="text-slate-500">1 / 10 句</Badge>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="p-8 text-center border-b border-slate-100 bg-white">
            <div className="mb-6 flex justify-center">
              <Button variant="outline" size="sm" className="rounded-full gap-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                <Volume2 className="w-4 h-4" /> 播放原音
              </Button>
            </div>
            
            <div className="text-3xl font-medium text-slate-800 leading-relaxed mb-4">
              <span className="text-slate-800">Where </span>
              <span className="text-slate-800">are </span>
              {hasResult ? (
                <span className="text-red-500 font-bold underline decoration-red-200 underline-offset-4" title="发音不准">you</span>
              ) : (
                <span>you</span>
              )}
              <span className="text-slate-800"> from?</span>
            </div>
            <p className="text-lg text-slate-500">你来自哪里？</p>
          </div>

          {/* Result Section */}
          {isAnalyzing && (
            <div className="p-8 bg-slate-50 flex items-center justify-center">
              <div className="text-indigo-600 font-medium animate-pulse">正在 AI 智能评分中...</div>
            </div>
          )}
          {hasResult && (
            <div className="p-8 bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                {/* Score Circle */}
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="8" 
                      strokeDasharray="283" 
                      strokeDashoffset="28.3" // 90% score
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-4xl font-bold text-slate-800">90</div>
                    <div className="text-xs text-slate-500 font-medium tracking-widest uppercase">Excellent</div>
                  </div>
                </div>

                {/* Score Details */}
                <div className="flex-1 w-full space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 border border-slate-100 rounded-lg shadow-sm">
                      <div className="text-xs text-slate-500 mb-1">发音准确度</div>
                      <div className="font-bold text-slate-800 flex items-center gap-2">
                        85分 <span className="text-xs font-normal px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded">有待提升</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 border border-slate-100 rounded-lg shadow-sm">
                      <div className="text-xs text-slate-500 mb-1">流利度</div>
                      <div className="font-bold text-slate-800 flex items-center gap-2">
                        95分 <span className="text-xs font-normal px-1.5 py-0.5 bg-green-100 text-green-700 rounded">完美</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 border border-slate-100 rounded-lg shadow-sm">
                      <div className="text-xs text-slate-500 mb-1">重音与语调</div>
                      <div className="font-bold text-slate-800 flex items-center gap-2">
                        90分 <CheckCircle2 className="w-4 h-4 text-green-500"/>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg text-sm text-orange-800">
                    <strong className="font-bold">AI 纠音建议：</strong>
                    {aiFeedback}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="p-6 bg-white border-t border-slate-100 flex flex-col items-center justify-center gap-4">
            <button 
              onClick={toggleRecording}
              disabled={isAnalyzing}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse ring-8 ring-red-100' 
                  : isAnalyzing ? 'bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105'
              }`}
            >
              <Mic className={`w-8 h-8 ${isRecording ? 'animate-bounce' : ''}`} />
            </button>
            <div className="text-slate-500 text-sm font-medium">
              {isRecording ? "点击结束录音" : isAnalyzing ? "处理中..." : "点击麦克风开始跟读"}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center px-2">
        <Button variant="ghost" className="text-slate-500 gap-2">
          <RotateCcw className="w-4 h-4" /> 再试一次
        </Button>
        <Button className="bg-slate-900 hover:bg-slate-800 gap-2 px-8">
          下一句 <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
