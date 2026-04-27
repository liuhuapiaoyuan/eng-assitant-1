import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';
import { AlertCircle, FileText, Download, Target, TrendingUp, TrendingDown, Minus, Users } from "lucide-react";







import { trendData, radarData, distributionData, studentProgressData } from '../../mock/analytics';
export default function StudentAnalytics() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-wrap gap-3 items-center">
          <Select defaultValue="class1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择班级" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="class1">七年级 1 班</SelectItem>
              <SelectItem value="class2">七年级 2 班</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="month">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">最近一周</SelectItem>
              <SelectItem value="month">最近一月</SelectItem>
              <SelectItem value="term">本学期</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline"><Download className="w-4 h-4 mr-2" /> 导出学情报告</Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">作业平均完成率</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">92.5%</p>
              <p className="text-xs text-green-600 flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1"/> 较上月 +2%</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">班级平均分</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">84.2</p>
              <p className="text-xs text-green-600 flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1"/> 较上月 +1.5分</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">重点关注学生</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">3 <span className="text-sm font-normal text-slate-500">人</span></p>
              <p className="text-xs text-slate-500 mt-1">不及格或完成率极低</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">高频易错点</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">2 <span className="text-sm font-normal text-slate-500">个</span></p>
              <p className="text-xs text-slate-500 mt-1">错误率超过 40%</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
               <AlertCircle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Charts */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-slate-800">班级平均分趋势</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="class1" name="1班平均分" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6'}} />
                </LineChart>
              </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-slate-800">分数段分布 (最近一次练习)</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <RechartsTooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="count" name="人数" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

        {/* AI Analysis and Weaknesses */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-[400px] bg-slate-50 p-6 flex flex-col justify-center border-r border-slate-100">
             <h3 className="font-bold text-slate-800 mb-2">班级能力雷达图</h3>
             <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                   <PolarGrid stroke="#e2e8f0" />
                   <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 13}} />
                   <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                   <Radar name="能力得分" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
          </div>
          <div className="flex-1 p-6 space-y-6">
             <div>
               <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-4">
                 <AlertCircle className="w-5 h-5 text-orange-500" />
                 近期表现痛点
               </h3>
               <div className="space-y-4">
                 <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-xl">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-slate-800">1. be动词的第三人称单数 (语法)</h4>
                     <Badge variant="outline" className="bg-orange-100 text-orange-700 border-none">错误率 45%</Badge>
                   </div>
                   <p className="text-sm text-slate-600 mb-2">在 "He/She is..." 和 "They are..." 的填空中，大量学生混淆了 is 和 are 的用法。</p>
                   <p className="text-sm font-medium text-slate-800">典型错误例句：He am/are from America.</p>
                 </div>
                 
                 <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-xl">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-slate-800">2. /th/ 发音 (口语)</h4>
                     <Badge variant="outline" className="bg-orange-100 text-orange-700 border-none">丢分率 38%</Badge>
                   </div>
                   <p className="text-sm text-slate-600 mb-2">在单词 thank, this, that 的口语评测中，发音识别分数普遍偏低，常读成 /s/ 或 /z/。</p>
                 </div>
               </div>
             </div>

             <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl">
               <h3 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                 <FileText className="w-4 h-4" /> AI 教学干预建议
               </h3>
               <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1.5 leading-relaxed marker:text-indigo-400">
                 <li>在下一节的复习课中，重点串讲 <strong>人称代词与 be 动词搭配</strong> 的口诀。</li>
                 <li>建议为错误率较高的 12 名学生，生成一份专项的 <strong>“be 动词语法巩固” 分层作业</strong>。</li>
                 <li>明天早读时间，可在大屏播放 <strong>咬舌音 /th/ 发音示范视频</strong>。</li>
               </ul>
               <Button size="sm" className="mt-4 bg-indigo-600 hover:bg-indigo-700">采纳建议并生成作业</Button>
             </div>
          </div>
        </Card>

        {/* Individual Student Tracking Section */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base text-slate-800">个人学习进度跟踪</CardTitle>
            <Button variant="outline" size="sm">查看所有学生</Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">学生姓名</th>
                    <th scope="col" className="px-6 py-3 font-medium">平均分</th>
                    <th scope="col" className="px-6 py-3 font-medium">作业完成率</th>
                    <th scope="col" className="px-6 py-3 font-medium">薄弱环节</th>
                    <th scope="col" className="px-6 py-3 font-medium">近期趋势</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentProgressData.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{student.name}</td>
                      <td className="px-6 py-4">
                        <span className={student.score < 60 ? 'text-red-600 font-bold' : 'text-slate-700'}>
                          {student.score}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${student.completion < 80 ? 'bg-orange-400' : 'bg-green-500'}`}
                              style={{ width: `${student.completion}%` }}
                            />
                          </div>
                          <span className={student.completion < 80 ? 'text-orange-600' : 'text-slate-600'}>
                            {student.completion}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium">
                          {student.weakness}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {student.trend === 'up' && <span className="flex items-center text-green-600"><TrendingUp className="w-4 h-4 mr-1" /> 进步</span>}
                        {student.trend === 'down' && <span className="flex items-center text-red-600"><TrendingDown className="w-4 h-4 mr-1" /> 退步</span>}
                        {student.trend === 'flat' && <span className="flex items-center text-slate-500"><Minus className="w-4 h-4 mr-1" /> 持平</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
