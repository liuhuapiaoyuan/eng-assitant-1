import { useState } from "react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Volume2, Mic, Sparkles, ChevronDown, ChevronUp, Info, HelpCircle } from "lucide-react";

import { sentences } from '../../mock/textLearning';
export default function TextLearning() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [aiExplainOpen, setAiExplainOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState<any>(null);

  

  const toggleSentence = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const showWordExplanation = (phrase: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentWord(phrase);
  };

  const renderEnglishText = (sentence: any) => {
    let text = sentence.en;
    // Simple mock highlighting for demonstration
    if (sentence.keyPhrases && sentence.keyPhrases.length > 0) {
      sentence.keyPhrases.forEach((phrase: any) => {
        text = text.replace(
          phrase.text, 
          `<span class="text-indigo-600 font-medium underline decoration-indigo-300 underline-offset-4 cursor-pointer hover:bg-indigo-50 transition-colors" data-phrase="${phrase.text}">$&</span>`
        );
      });
    }

    return (
      <div 
        className="text-xl font-medium text-slate-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: text }} 
        // Need to attach events to dynamic HTML in a real app, here we simulate click on the sentence
      />
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center relative overflow-hidden gap-4">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-16 -translate-y-16"></div>
        <div className="relative">
          <Badge variant="outline" className="mb-2 text-indigo-600 border-indigo-200 bg-indigo-50">Unit 1 Topic 1 Section B</Badge>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">课文精读：1a Look, listen and say</h1>
        </div>
        <Button variant="outline" className="gap-2 shrink-0">
          <Volume2 className="w-4 h-4" /> 全文朗读
        </Button>
      </div>

      <div className="space-y-4">
        {sentences.map((item) => (
          <Card 
            key={item.id} 
            className={`border transition-all cursor-pointer ${expandedId === item.id ? 'border-indigo-300 shadow-md ring-1 ring-indigo-50' : 'border-slate-200 shadow-sm hover:border-slate-300'}`}
            onClick={() => toggleSentence(item.id)}
          >
            <CardContent className="p-0">
              <div className="p-5 flex gap-4">
                <div className="mt-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" onClick={(e) => e.stopPropagation()}>
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  {/* English Text */}
                  <div onClick={(e) => {
                    // Try to catch clicks on highlighted terms
                    const target = e.target as HTMLElement;
                    if (target.dataset.phrase) {
                      const phrase = item.keyPhrases.find(p => p.text === target.dataset.phrase);
                      if (phrase) showWordExplanation(phrase, e);
                    }
                  }}>
                    {renderEnglishText(item)}
                  </div>

                  {/* Expanded Content */}
                  {expandedId === item.id && (
                    <div className="mt-4 pt-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                      <p className="text-slate-600 text-lg mb-4">{item.zh}</p>
                      
                      {/* Action Bar */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 gap-1.5"
                          onClick={(e) => { e.stopPropagation(); setAiExplainOpen(true); }}
                        >
                          <Sparkles className="w-4 h-4" /> AI 伴学讲解
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-slate-600 gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mic className="w-4 h-4" /> 跟读评测
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-slate-400 ml-auto gap-1.5"
                        >
                          收起 <ChevronUp className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {expandedId !== item.id && (
                    <div className="mt-2 flex justify-center">
                       <ChevronDown className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Word Explanation Floating Card (Mocked as static for now, triggered by modal in real app or inline) */}
      {currentWord && (
        <Dialog open={!!currentWord} onOpenChange={(open) => !open && setCurrentWord(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl font-bold text-indigo-700">
                <Info className="w-5 h-5" /> {currentWord.text}
              </DialogTitle>
              <DialogDescription className="pt-4 text-base text-slate-700">
                {currentWord.desc}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setCurrentWord(null)}>知道了</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* AI Explanation Dialog */}
      <Dialog open={aiExplainOpen} onOpenChange={setAiExplainOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="text-indigo-500 w-5 h-5" /> AI 语法与句型解析
            </DialogTitle>
          </DialogHeader>
          <div className="bg-slate-50 p-4 rounded-lg text-slate-800 space-y-4">
            <div className="border-l-4 border-indigo-500 pl-3">
              <p className="font-medium text-lg">Nice to meet you. My name is Jane.</p>
              <p className="text-slate-500 mt-1">见到你们很高兴。我的名字叫简。</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><HelpCircle className="w-4 h-4 text-slate-400"/> 核心考点</h4>
              <p className="text-sm leading-relaxed">
                <strong className="text-indigo-700">Nice to meet you.</strong> 是初次见面时最常见的问候语。它的完整形式是 "It is nice to meet you."。当对方对你说这句话时，你的标准回答应该是："Nice to meet you, too." (见到你我也很高兴)。
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">💡 扩展应用</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>介绍自己可以说: My name is... 或 I am...</li>
                <li>介绍别人可以说: This is...</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}
