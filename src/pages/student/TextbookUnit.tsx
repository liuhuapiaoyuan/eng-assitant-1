import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle2, PlayCircle, BookText, SpellCheck, Settings, Mic2, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { sections } from '../../mock/textbook';
export default function TextbookUnit() {
  

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Textbook Selector */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center">
        <span className="font-medium text-slate-700 ml-2">教材切换：</span>
        <Select defaultValue="g7">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="选择年级" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="g7">七年级上册</SelectItem>
            <SelectItem value="g7d">七年级下册</SelectItem>
            <SelectItem value="g8">八年级上册</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="u1">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="选择单元" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="u1">Unit 1 Making New Friends</SelectItem>
            <SelectItem value="u2">Unit 2 Looking Different</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="t1">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="选择话题" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="t1">Topic 1 Welcome to China!</SelectItem>
            <SelectItem value="t2">Topic 2 Where are you from?</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column: Unit Info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-gradient-to-b from-indigo-50 to-white">
            <CardHeader>
              <CardDescription className="text-indigo-600 font-bold">Unit 1 • Topic 1</CardDescription>
              <CardTitle className="text-xl leading-tight">Welcome to China!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">单元目标</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    词汇：welcome, meet, China 等20个新词
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    句型：Nice to meet you. / Welcome to...
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                    语法：Be动词的一般现在时 (am, is, are)
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-indigo-100">
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="text-slate-600">总进度</span>
                  <span className="font-bold text-indigo-600">41%</span>
                </div>
                <Progress value={41} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Sections */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 mb-4">学习内容 (Sections)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map((sec) => (
              <Card 
                key={sec.id} 
                className={`border-slate-100 shadow-sm overflow-hidden transition-all ${
                  sec.status === "completed" ? "bg-slate-50/50" : 
                  sec.status === "in-progress" ? "border-indigo-200 shadow-md ring-1 ring-indigo-50" : 
                  "opacity-75"
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge 
                        variant={sec.status === "completed" ? "secondary" : sec.status === "in-progress" ? "default" : "outline"}
                        className={sec.status === "in-progress" ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none" : ""}
                      >
                        Section {sec.id}
                      </Badge>
                      <CardTitle className="mt-2 text-lg">{sec.desc}</CardTitle>
                    </div>
                    {sec.status === "completed" && <CheckCircle2 className="text-green-500 w-6 h-6" />}
                    {sec.status === "in-progress" && <div className="text-indigo-600 font-bold">{sec.progress}%</div>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mt-2">
                    {sec.modules.map((mod, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <div className={`p-1.5 rounded-md ${mod.done ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                            <mod.icon className="w-3.5 h-3.5" />
                          </div>
                          <span className={mod.done ? "text-slate-600 line-through opacity-70" : "text-slate-700 font-medium"}>
                            {mod.name}
                          </span>
                        </div>
                        {sec.status !== "locked" && !mod.done && (
                          <Button variant="ghost" size="sm" asChild className="h-7 text-xs text-indigo-600 hover:bg-indigo-50">
                            {/* Route to TextLearning for learning modules */}
                            <Link to="/student/text">去学习</Link>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
