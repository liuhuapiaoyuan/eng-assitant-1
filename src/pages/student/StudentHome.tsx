import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Mic, PenTool, Flame, Clock, Award, AlertCircle, PlayCircle, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";

export default function StudentHome() {
  const [motivation, setMotivation] = useState("");
  const [loadingObj, setLoadingObj] = useState(true);

  useEffect(() => {
    async function loadQuote() {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
           model: 'gemini-3-flash-preview',
           contents: "请给正在学习初中英语的学生李明一句话的简短鼓励，中英文结合更佳。不要前缀和多余内容。"
        });
        setMotivation(response.text || "Every day is a new beginning! 每天都是新的开始！");
      } catch (e) {
        setMotivation("Keep going! 坚持就是胜利！");
      } finally {
        setLoadingObj(false);
      }
    }
    loadQuote();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">早上好，李明！🌤️</h1>
          <p className="text-slate-500 mt-1">今天是你坚持学习的第 <span className="text-indigo-600 font-bold">12</span> 天。 
            <span className="ml-2 text-indigo-500 italic">
              {loadingObj ? <Loader2 className="inline w-3 h-3 animate-spin"/> : motivation}
            </span>
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full mt-2 md:mt-0">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-orange-700 text-sm font-medium">连续学习 12 天</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full mt-2 md:mt-0">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span className="text-indigo-700 text-sm font-medium">今日学时 25 分钟</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Tasks and Progress */}
        <div className="md:col-span-2 space-y-6">
          {/* Current Progress */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 p-6 text-white flex justify-between items-center">
              <div>
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none mb-2">当前进度</Badge>
                <h2 className="text-2xl font-bold">七年级上册 / Unit 1 / Topic 1</h2>
                <p className="text-indigo-100 mt-1 text-sm">Welcome to China! - Section B</p>
              </div>
              <BookOpen className="w-12 h-12 text-white/20" />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700">Topic 1 学习进度</span>
                <span className="text-sm font-bold text-indigo-600">65%</span>
              </div>
              <Progress value={65} className="h-2 mb-4" />
              <div className="flex gap-3 mt-4">
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Link to="/student/unit">继续学习 <PlayCircle className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />今日任务
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Task 1 */}
              <Card className="hover: transition- relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <CardContent className="p-5 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none">预习检测</Badge>
                      <span className="text-xs text-slate-400">未完成</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg">Section B 词汇预习</h4>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">完成新单词的认读与拼写测试。</p>
                  </div>
                  <Button variant="ghost" asChild className="mt-4 w-full justify-between text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 group-hover:bg-indigo-50">
                    <Link to="/student/unit">去完成 <ArrowRight className="w-4 h-4" /></Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Task 2 */}
              <Card className="hover: transition- relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <CardContent className="p-5 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">口语跟读</Badge>
                      <span className="text-xs text-slate-400">进行中</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg">每日一句跟读</h4>
                    <p className="text-sm text-slate-500 mt-1">发音评测，今天还没达到90分哦。</p>
                  </div>
                  <Button variant="ghost" asChild className="mt-4 w-full justify-between text-orange-600 hover:text-orange-800 hover:bg-orange-50 group-hover:bg-orange-50">
                    <Link to="/student/speaking">去练习 <ArrowRight className="w-4 h-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Column: Homework & Alerts */}
        <div className="space-y-6">
          {/* Homework alerts */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-50">
              <CardTitle className="text-base flex items-center gap-2">
                <PenTool className="w-4 h-4 text-slate-500" />
                作业提醒
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">课后练习 (Section A)</h4>
                  <p className="text-xs mt-1 opacity-80">即将截止: 今天 22:00</p>
                  <Button variant="link" asChild className="p-0 h-auto text-red-700 mt-1 font-bold">
                    <Link to="/student/assignments">立即去写 &rarr;</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-slate-50 text-slate-700 p-3 rounded-lg flex items-start gap-3 border border-slate-100">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">周末小作文</h4>
                  <p className="text-xs mt-1 opacity-80 text-slate-500">已批改，得分为 A-</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weakness Alert */}
          <Card className="bg-purple-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-purple-900">智能弱项复习</CardTitle>
              <CardDescription className="text-purple-700/80">根据你最近的学习表现分析</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-purple-100 flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">一般现在时用法</span>
                  <Badge variant="outline" className="text-purple-600 border-purple-200">待巩固</Badge>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-purple-100 flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">国家与国籍词汇</span>
                  <Badge variant="outline" className="text-purple-600 border-purple-200">易拼错</Badge>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-100 hover:text-purple-800">
                <Link to="/student/unit">进入错题本</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
