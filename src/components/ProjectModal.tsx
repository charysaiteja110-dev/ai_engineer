import React, { useState } from 'react';
import { Project } from '../types';
import { X, Play, Code2, Copy, Check, Terminal, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo');
  const [copied, setCopied] = useState(false);

  // Voter state
  const [voterName, setVoterName] = useState('Sai Teja');
  const [voterAge, setVoterAge] = useState<number | string>(18);
  const [isCitizen, setIsCitizen] = useState(true);
  const [voterResult, setVoterResult] = useState<{ eligible: boolean; message: string } | null>({
    eligible: true,
    message: 'Eligible: Meets legal voting age (18+) and citizenship criteria.',
  });

  // Calculator state
  const [calcNum1, setCalcNum1] = useState<string>('24');
  const [calcOp, setCalcOp] = useState<string>('+');
  const [calcNum2, setCalcNum2] = useState<string>('8');
  const [calcResult, setCalcResult] = useState<string>('32');
  const [calcError, setCalcError] = useState<string | null>(null);

  // ATM state
  const [atmPin, setAtmPin] = useState('1234');
  const [atmEnteredPin, setAtmEnteredPin] = useState('1234');
  const [atmAuthenticated, setAtmAuthenticated] = useState(true);
  const [atmBalance, setAtmBalance] = useState(5000);
  const [atmAmount, setAtmAmount] = useState<string>('500');
  const [atmLog, setAtmLog] = useState<string[]>([
    'System: Session authenticated with PIN 1234',
    'Account Balance: $5,000.00',
  ]);

  // Grade state
  const [grades, setGrades] = useState<{ subject: string; score: number }[]>([
    { subject: 'Python Programming', score: 92 },
    { subject: 'Web Development Basics', score: 88 },
    { subject: 'Mathematics & Logic', score: 85 },
    { subject: 'Computer Fundamentals', score: 90 },
  ]);
  const [gradeResult, setGradeResult] = useState<{
    total: number;
    percentage: number;
    grade: string;
    remark: string;
  } | null>({
    total: 355,
    percentage: 88.75,
    grade: 'A',
    remark: 'Excellent Work',
  });

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Voter Evaluation
  const evaluateVoter = () => {
    const ageNum = Number(voterAge);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      setVoterResult({
        eligible: false,
        message: 'Invalid age: Please enter a valid number between 0 and 120.',
      });
      return;
    }
    if (ageNum >= 18 && isCitizen) {
      setVoterResult({
        eligible: true,
        message: `Status: ELIGIBLE. ${voterName || 'Applicant'} is 18+ and a registered citizen.`,
      });
    } else if (ageNum < 18) {
      const waitYears = 18 - ageNum;
      setVoterResult({
        eligible: false,
        message: `Status: NOT YET ELIGIBLE. Will be eligible in ${waitYears} year(s).`,
      });
    } else {
      setVoterResult({
        eligible: false,
        message: 'Status: NOT ELIGIBLE. Citizenship requirement must be verified.',
      });
    }
  };

  // Calculator Evaluation
  const evaluateCalc = () => {
    setCalcError(null);
    const n1 = parseFloat(calcNum1);
    const n2 = parseFloat(calcNum2);

    if (isNaN(n1) || isNaN(n2)) {
      setCalcError('Please enter valid numeric inputs.');
      return;
    }

    try {
      let res: number;
      switch (calcOp) {
        case '+':
          res = n1 + n2;
          break;
        case '-':
          res = n1 - n2;
          break;
        case '*':
          res = n1 * n2;
          break;
        case '/':
          if (n2 === 0) {
            setCalcError('ZeroDivisionError: Division by zero is mathematically undefined.');
            return;
          }
          res = n1 / n2;
          break;
        case '%':
          res = n1 % n2;
          break;
        case '^':
          res = Math.pow(n1, n2);
          break;
        default:
          res = 0;
      }
      setCalcResult(String(Number(res.toFixed(4))));
    } catch {
      setCalcError('Calculation execution failed.');
    }
  };

  // ATM Actions
  const handleAtmAuth = () => {
    if (atmEnteredPin === atmPin) {
      setAtmAuthenticated(true);
      setAtmLog((prev) => [
        `System: Authentication successful for PIN ${atmEnteredPin}`,
        ...prev,
      ]);
    } else {
      setAtmAuthenticated(false);
      setAtmLog((prev) => [
        `Auth Error: Invalid PIN entered (${atmEnteredPin}). Try 1234.`,
        ...prev,
      ]);
    }
  };

  const handleAtmDeposit = () => {
    const val = parseFloat(atmAmount);
    if (isNaN(val) || val <= 0) return;
    const newBal = atmBalance + val;
    setAtmBalance(newBal);
    setAtmLog((prev) => [
      `Deposit +$${val.toFixed(2)} | Balance: $${newBal.toFixed(2)}`,
      ...prev,
    ]);
  };

  const handleAtmWithdraw = () => {
    const val = parseFloat(atmAmount);
    if (isNaN(val) || val <= 0) return;
    if (val > atmBalance) {
      setAtmLog((prev) => [
        `Declined: Insufficient funds. Requested $${val.toFixed(2)} with balance $${atmBalance.toFixed(2)}`,
        ...prev,
      ]);
      return;
    }
    const newBal = atmBalance - val;
    setAtmBalance(newBal);
    setAtmLog((prev) => [
      `Withdrawal -$${val.toFixed(2)} | Balance: $${newBal.toFixed(2)}`,
      ...prev,
    ]);
  };

  // Grade Evaluation
  const evaluateGrades = () => {
    const total = grades.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const max = grades.length * 100;
    const percentage = Number(((total / max) * 100).toFixed(2));

    let grade = 'F';
    let remark = 'Needs Improvement';
    if (percentage >= 90) {
      grade = 'A+';
      remark = 'Outstanding Performance';
    } else if (percentage >= 80) {
      grade = 'A';
      remark = 'Excellent Work';
    } else if (percentage >= 70) {
      grade = 'B';
      remark = 'Good Understanding';
    } else if (percentage >= 60) {
      grade = 'C';
      remark = 'Satisfactory Progress';
    } else if (percentage >= 50) {
      grade = 'D';
      remark = 'Pass — Needs Practice';
    }

    setGradeResult({ total, percentage, grade, remark });
  };

  const handleSubjectScoreChange = (index: number, value: string) => {
    const num = Math.min(100, Math.max(0, parseInt(value) || 0));
    setGrades((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], score: num };
      return copy;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-xl border border-neutral-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-[#FAF9F6]">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.technology}</span>
            </div>
            <h2 id="modal-title" className="text-xl font-semibold text-neutral-900 mt-0.5">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-neutral-100 bg-white">
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('demo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'demo'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              Interactive Demo
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'code'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Python Source Code
            </button>
          </div>

          {activeTab === 'code' && (
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 rounded-md transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Python Script</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'code' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Direct Python implementation showcasing procedural logic & defensive handling</span>
                <span className="font-mono">main.py</span>
              </div>
              <div className="relative rounded-lg bg-neutral-950 p-4 border border-neutral-800 text-neutral-100 font-mono text-xs overflow-x-auto leading-relaxed">
                <pre>{project.pythonCode}</pre>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-xs text-neutral-600 space-y-1">
                <p className="font-semibold text-neutral-800">Key Logic Concepts Practiced:</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-neutral-600 pt-1">
                  {project.keyConcepts.map((c, i) => (
                    <span key={i}>• {c}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-sm text-neutral-600">
                {project.description}
              </div>

              {/* DEMO 1: VOTER ELIGIBILITY */}
              {project.demoType === 'voter' && (
                <div className="space-y-4 bg-neutral-50 p-5 rounded-xl border border-neutral-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={voterName}
                        onChange={(e) => setVoterName(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="e.g. Sai Teja"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Age (Years)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={voterAge}
                        onChange={(e) => setVoterAge(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Citizen Registration
                      </label>
                      <div className="flex items-center gap-3 pt-2 text-sm">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="citizen"
                            checked={isCitizen}
                            onChange={() => setIsCitizen(true)}
                            className="text-blue-600"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="citizen"
                            checked={!isCitizen}
                            onChange={() => setIsCitizen(false)}
                            className="text-blue-600"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={evaluateVoter}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      Execute Eligibility Check
                    </button>
                  </div>

                  {voterResult && (
                    <div
                      className={`p-4 rounded-lg border text-xs leading-relaxed ${
                        voterResult.eligible
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <p className="font-semibold">{voterResult.message}</p>
                      <p className="text-neutral-500 text-[11px] mt-1">
                        Evaluated via Python logic: <code>age &gt;= 18 and citizenship == True</code>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* DEMO 2: CALCULATOR */}
              {project.demoType === 'calculator' && (
                <div className="space-y-4 bg-neutral-50 p-5 rounded-xl border border-neutral-200">
                  <div className="grid grid-cols-3 gap-3 items-end">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        First Number
                      </label>
                      <input
                        type="number"
                        value={calcNum1}
                        onChange={(e) => setCalcNum1(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Operator
                      </label>
                      <select
                        value={calcOp}
                        onChange={(e) => setCalcOp(e.target.value)}
                        aria-label="Select arithmetic operator"
                        className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                      >
                        <option value="+">+ (Addition)</option>
                        <option value="-">- (Subtraction)</option>
                        <option value="*">* (Multiplication)</option>
                        <option value="/">/ (Division)</option>
                        <option value="%">% (Modulus)</option>
                        <option value="^">^ (Exponentiation)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Second Number
                      </label>
                      <input
                        type="number"
                        value={calcNum2}
                        onChange={(e) => setCalcNum2(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={evaluateCalc}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Calculate
                    </button>
                  </div>

                  {calcError ? (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-mono">
                      {calcError}
                    </div>
                  ) : (
                    <div className="p-4 bg-white border border-neutral-200 rounded-lg">
                      <div className="text-xs text-neutral-500 mb-1">Output Result:</div>
                      <div className="font-mono text-xl font-semibold text-neutral-900">
                        {calcNum1} {calcOp} {calcNum2} = <span className="text-blue-600">{calcResult}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* DEMO 3: ATM MANAGEMENT */}
              {project.demoType === 'atm' && (
                <div className="space-y-4 bg-neutral-50 p-5 rounded-xl border border-neutral-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white rounded-lg border border-neutral-200">
                    <div>
                      <div className="text-xs text-neutral-500">Current Balance</div>
                      <div className="text-2xl font-mono font-semibold text-neutral-900">
                        ${atmBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="PIN (1234)"
                        value={atmEnteredPin}
                        onChange={(e) => setAtmEnteredPin(e.target.value)}
                        className="w-24 px-2 py-1.5 text-xs text-center border border-neutral-300 rounded font-mono"
                      />
                      <button
                        onClick={handleAtmAuth}
                        className="px-3 py-1.5 bg-neutral-800 text-white text-xs rounded hover:bg-neutral-700"
                      >
                        Verify PIN
                      </button>
                    </div>
                  </div>

                  {atmAuthenticated ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Transaction Amount ($)
                        </label>
                        <input
                          type="number"
                          value={atmAmount}
                          onChange={(e) => setAtmAmount(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg font-mono"
                        />
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={handleAtmDeposit}
                            className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors"
                          >
                            Deposit Funds
                          </button>
                          <button
                            onClick={handleAtmWithdraw}
                            className="flex-1 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium rounded-lg transition-colors"
                          >
                            Withdraw Funds
                          </button>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-neutral-200">
                        <div className="text-xs font-semibold text-neutral-700 mb-1 flex items-center justify-between">
                          <span>Transaction Log</span>
                          <span className="text-[10px] text-neutral-400 font-mono">STATEFUL</span>
                        </div>
                        <div className="h-28 overflow-y-auto space-y-1 font-mono text-[11px] text-neutral-600 divide-y divide-neutral-100">
                          {atmLog.map((log, idx) => (
                            <div key={idx} className="py-1">
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                      Enter PIN <code>1234</code> to access ATM operations.
                    </div>
                  )}
                </div>
              )}

              {/* DEMO 4: STUDENT GRADE CALCULATOR */}
              {project.demoType === 'grade' && (
                <div className="space-y-4 bg-neutral-50 p-5 rounded-xl border border-neutral-200">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-neutral-700">
                      Enter Subject Marks (out of 100):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {grades.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-neutral-200 rounded-lg">
                          <span className="text-xs text-neutral-700 font-medium truncate mr-2">
                            {item.subject}
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={item.score}
                            onChange={(e) => handleSubjectScoreChange(idx, e.target.value)}
                            className="w-16 px-2 py-1 text-xs text-right border border-neutral-300 rounded font-mono font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={evaluateGrades}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Compute Academic Grades
                    </button>
                  </div>

                  {gradeResult && (
                    <div className="p-4 bg-white border border-neutral-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="p-2 border-r border-neutral-100 last:border-none">
                        <div className="text-[11px] text-neutral-500">Total Marks</div>
                        <div className="text-base font-semibold font-mono text-neutral-900 mt-0.5">
                          {gradeResult.total} / {grades.length * 100}
                        </div>
                      </div>
                      <div className="p-2 border-r border-neutral-100 last:border-none">
                        <div className="text-[11px] text-neutral-500">Percentage</div>
                        <div className="text-base font-semibold font-mono text-blue-600 mt-0.5">
                          {gradeResult.percentage}%
                        </div>
                      </div>
                      <div className="p-2 border-r border-neutral-100 last:border-none">
                        <div className="text-[11px] text-neutral-500">Grade Tier</div>
                        <div className="text-base font-bold font-mono text-neutral-900 mt-0.5">
                          {gradeResult.grade}
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="text-[11px] text-neutral-500">Faculty Remark</div>
                        <div className="text-xs font-medium text-emerald-700 mt-1">
                          {gradeResult.remark}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-200 bg-[#FAF9F6] text-xs text-neutral-500">
          <span>Project by Sai Teja Chary</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 rounded-md hover:bg-neutral-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
