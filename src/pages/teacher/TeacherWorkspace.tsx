import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, ClipboardList, BarChart3, AlertCircle, Edit, Search, Users, ArrowUpRight, Clock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";

export default function TeacherWorkspace() {
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSuggestion = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "你是初中英语老师的AI助手。发现学生最近在发音连缀(连读)部分较弱。请给出一段50字左右的建议方案，并提供一句简单的课堂连读带读范例。直接输出纯文本。";
      const response = await ai.models.generateContent({
         model: 'gemini-3-flash-preview',
         contents: prompt
      });
      setAiSuggestion(response.text || "方案生成失败");
    } catch (e) {
      setAiSuggestion("生成失败，请检查配置。");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">王老师，早上好！</h1>
          <p className="text-slate-500 mt-1">今天有 <strong className="text-red-500">12</strong> 份作业待批改，<strong className="text-orange-500">3</strong> 名学生需要重点关注。</p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
             <Link to="/teacher/lesson-prep"><FileText className="w-4 h-4 mr-2" /> 智能备课</Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-200">
             <Link to="/teacher/assignment-gen"><Edit className="w-4 h-4 mr-2" /> 快速布置作业</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col (2 cols wide): Overview & Classes */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-white">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">班级总人数</p>
                  <p className="text-2xl font-bold text-slate-900">95</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">昨日作业提交率</p>
                  <p className="text-2xl font-bold text-slate-900">92%</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">班级平均分</p>
                  <p className="text-2xl font-bold text-slate-900">86.5</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Teaching Progress */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">教材与备课</CardTitle>
                <Button variant="link" asChild className="p-0 h-auto text-indigo-600">
                  <Link to="/teacher/materials">查看全部 <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <div className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div>
                    <Badge variant="outline" className="mb-2 text-indigo-600 border-indigo-200 bg-indigo-50">七年级上册</Badge>
                    <h3 className="font-bold text-slate-800">Unit 1 Topic 1 Section C</h3>
                    <p className="text-sm text-slate-500 mt-1">明日教学内容：告别与祝愿</p>
                  </div>
                  <Button variant="secondary" asChild className="bg-white border shadow-sm text-slate-700">
                    <Link to="/teacher/lesson-prep">生成教案</Link>
                  </Button>
                </div>
                <div className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div>
                    <Badge variant="outline" className="mb-2 text-slate-500 border-slate-200 bg-slate-50">七年级上册</Badge>
                    <h3 className="font-bold text-slate-800">Unit 1 Topic 1 Section B</h3>
                    <p className="text-sm text-slate-500 mt-1">已完成教学</p>
                  </div>
                  <Button variant="ghost" className="text-slate-500">
                    查看课件
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* To-dos */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                今日待办
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium text-slate-800">批改作文：My New Friend (七年级1班)</h4>
                      <p className="text-xs text-slate-500 mt-1">已有 42/45 人提交，系统已完成预打分</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/teacher/essay-review">去审核</Link>
                  </Button>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium text-slate-800">布置周末作业 (七年级2班)</h4>
                      <p className="text-xs text-slate-500 mt-1">建议布置 Unit 1 综合复习卷</p>
                    </div>
                  </div>
                  <Button size="sm" asChild variant="outline">
                    <Link to="/teacher/assignment-gen">去布置</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Alerts and Analytics Summary */}
        <div className="space-y-6">
          <Card className="bg-red-50/30 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
             <CardHeader className="pb-2">
               <CardTitle className="text-base text-red-800 flex items-center gap-2">
                 <AlertCircle className="w-4 h-4" /> 学情预警
               </CardTitle>
             </CardHeader>
             <CardContent className="pb-4 space-y-4">
               <div>
                 <h4 className="text-sm font-bold text-slate-800">未交作业预警</h4>
                 <div className="mt-2 space-y-2">
                   <div className="flex items-center justify-between bg-white p-2 border border-red-100 rounded text-sm">
                     <span className="text-slate-700">张小明 (七年级1班)</span>
                     <span className="text-red-600 font-medium">连续3次</span>
                   </div>
                   <div className="flex items-center justify-between bg-white p-2 border border-red-100 rounded text-sm">
                     <span className="text-slate-700">李华 (七年级2班)</span>
                     <span className="text-red-500 font-medium">未交作业</span>
                   </div>
                 </div>
               </div>
               <div className="pt-2 border-t border-red-100/50">
                 <h4 className="text-sm font-bold text-slate-800 mb-2">易错知识点</h4>
                 <div className="flex flex-wrap gap-2">
                   <Badge variant="outline" className="bg-white border-red-200 text-red-700">三单变化</Badge>
                   <Badge variant="outline" className="bg-white border-red-200 text-red-700">be动词缩写</Badge>
                 </div>
               </div>
               <Button asChild className="w-full bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-700" variant="outline">
                 <Link to="/teacher/analytics">查看详细报表</Link>
               </Button>
             </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-800">AI 教研助手分析</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 leading-relaxed">
              <p>近期数据表明，1班在<strong>口语发音部分（连读）</strong>整体较弱。建议在明天的 Section C 课堂中增加 5 分钟的专项带读训练。</p>
              {!aiSuggestion ? (
                <Button 
                  variant="link" 
                  className="px-0 mt-1 h-auto text-indigo-600" 
                  onClick={generateSuggestion}
                  disabled={isGenerating}
                >
                  {isGenerating ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> 生成中...</> : "点击生成带读方案 \u2192"}
                </Button>
              ) : (
                <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded text-indigo-800 whitespace-pre-wrap text-xs">
                  <strong>✨ AI 带读方案建议：</strong><br/>
                  {aiSuggestion}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
