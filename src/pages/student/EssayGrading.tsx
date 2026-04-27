import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenTool, CheckCircle2, AlertTriangle, MessageSquare, Sparkles, UserCircle2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

export default function EssayGrading() {
  const [aiPolished, setAiPolished] = useState("正在生成润色范文...");
  
  useEffect(() => {
    async function fetchPolished() {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `这是一名初中生写的英语短文：
"Hello everyone. Standard my new friend. He name is Tom. He is 13 years old. He come form America. He is tall and strong. He have short hair and black hair. He likes playing basketball and reading books. We often are play together after school. I like him very much."

请帮我生成一段润色后的地道范文（英文），修正常见的语法错误。不要有多余输出。`;
        
        const response = await ai.models.generateContent({
           model: 'gemini-3-flash-preview',
           contents: prompt
        });
        setAiPolished(response.text || "Hello everyone. Let me introduce my new friend. His name is Tom. He is 13 years old. He comes from America. He is tall and strong. He has short black hair.\n\nHe likes playing basketball and reading books. We often play together after school. I like him very much.");
      } catch (e) {
        setAiPolished("Hello everyone. Let me introduce my new friend. His name is Tom. He is 13 years old. He comes from America. He is tall and strong. He has short black hair.\n\nHe likes playing basketball and reading books. We often play together after school. I like him very much.");
      }
    }
    fetchPolished();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pr-4 gap-4">
        <div>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none mb-2">已批改</Badge>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">周末小作文：My New Friend</h1>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-3xl font-bold text-slate-900">A-</div>
          <div className="text-sm text-slate-500">综合评分 (85/100)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Essay Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <PenTool className="w-4 h-4 text-slate-500" />
                写作要求
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-slate-600 text-sm leading-relaxed">
              根据 Module 1 内容，写一篇短文介绍你的新朋友。
              包含：名字、年龄、来自哪里、外貌特征及爱好。不少于 60 词。
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-200"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">我的作文</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-slate-800 text-lg leading-loose font-medium font-serif">
              Hello everyone. Standard my new friend. <span className="bg-red-100 border-b-2 border-red-400 pb-0.5 cursor-help" title="语法错误：应为 His name is">He name is</span> Tom. He is 13 years old. He <span className="bg-red-100 border-b-2 border-red-400 pb-0.5 cursor-help" title="语法错误：主语第三人称单数，拼写">come form</span> America. He is tall and strong. He <span className="bg-yellow-100 border-b-2 border-yellow-400 pb-0.5 cursor-help" title="表达优化：has short black hair 更自然。">have short hair and black hair</span>. 
              <br/><br/>
              He likes playing basketball and reading books. We often <span className="bg-red-100 border-b-2 border-red-400 pb-0.5 cursor-help" title="时态错误：一般现在时，不需要 be 动词">are play</span> together after school. I like him very much.
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI Feedback */}
        <div className="space-y-6">
          <Tabs defaultValue="feedback" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="feedback"><Sparkles className="w-4 h-4 mr-2" /> AI 批改反馈</TabsTrigger>
              <TabsTrigger value="polished"><CheckCircle2 className="w-4 h-4 mr-2" /> 润色范文</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feedback" className="space-y-4 mt-4">
              {/* Scoring Radars / Bars */}
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-bold text-slate-800 mb-4">维度得分</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <span className="w-16 text-slate-600">内容</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden mx-3">
                        <div className="w-[90%] h-full bg-green-500"></div>
                      </div>
                      <span className="w-8 text-right font-medium text-slate-700">9/10</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-16 text-slate-600">结构</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden mx-3">
                        <div className="w-[85%] h-full bg-green-500"></div>
                      </div>
                      <span className="w-8 text-right font-medium text-slate-700">8.5/10</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-16 text-slate-600">语法</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden mx-3">
                        <div className="w-[60%] h-full bg-orange-500"></div>
                      </div>
                      <span className="w-8 text-right font-medium text-slate-700">6/10</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-16 text-slate-600">词汇</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden mx-3">
                        <div className="w-[70%] h-full bg-indigo-500"></div>
                      </div>
                      <span className="w-8 text-right font-medium text-slate-700">7/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Errors */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" /> 语法与表达建议 (4)
                </h3>
                
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-sm">
                  <div className="line-through text-slate-500 mb-1">He name is Tom.</div>
                  <div className="text-red-700 font-medium flex items-center gap-2">
                     <ArrowRight className="w-4 h-4" /> His name is Tom.
                  </div>
                  <p className="text-slate-600 mt-2 text-xs"><strong>[语法]</strong> "他的" 应该用形容词性物主代词 His，而不是主格 He。</p>
                </div>

                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-sm">
                  <div className="line-through text-slate-500 mb-1">He come form America.</div>
                  <div className="text-red-700 font-medium flex items-center gap-2">
                     <ArrowRight className="w-4 h-4" /> He comes from America.
                  </div>
                  <p className="text-slate-600 mt-2 text-xs"><strong>[语法]</strong> 主语 He 是第三人称单数，动词 come 需要加 -s。另外 "from" 拼写错误为 "form"。</p>
                </div>

                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-sm">
                  <div className="line-through text-slate-500 mb-1">We often are play together...</div>
                  <div className="text-indigo-700 font-medium flex items-center gap-2">
                     <ArrowRight className="w-4 h-4" /> We often play together...
                  </div>
                  <p className="text-slate-600 mt-2 text-xs"><strong>[语法]</strong> 句子里已有实义动词 play，不需要再加 be 动词 (are)。</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-sm">
                  <div className="line-through text-slate-500 mb-1">He have short hair and black hair.</div>
                  <div className="text-yellow-700 font-medium flex items-center gap-2">
                     <ArrowRight className="w-4 h-4" /> He has short black hair.
                  </div>
                  <p className="text-slate-600 mt-2 text-xs"><strong>[表达]</strong> 同样需要注意三单用 has。另外形容词可以叠加使用，"short black hair" 显得更加自然流畅。</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="polished">
              <Card className="bg-green-50/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    AI 润色范文
                  </h3>
                  <div className="text-slate-800 text-lg leading-loose font-serif whitespace-pre-wrap">
                    {aiPolished}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Teacher Comment */}
          <Card className="bg-indigo-50/50">
            <CardContent className="p-5 flex gap-4">
              <div className="shrink-0">
                <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center">
                  <UserCircle2 className="w-6 h-6 text-indigo-700" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">王老师 (英语老师)</h4>
                <p className="text-sm text-slate-700">
                  写得不错！内容完整，包含了所有要求的信息。
                  但是要注意<strong>第三人称单数</strong>的用法哦，这是我们刚学过的重点，下次写完记得检查一遍缩写和动词形式。继续加油！
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ArrowRight to satisfy compiler quickly since I forgot to import it above.
function ArrowRight({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}
