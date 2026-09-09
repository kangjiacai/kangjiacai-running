'use client';

import { useEffect, useMemo, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Clock3, Flag, MapPin } from 'lucide-react';

type Session = {
  id: string;
  day: string;
  date: string;
  time: string;
  kind: string;
  distance: string;
  title: string;
  pace: string;
  detail: string;
};

type Week = {
  id: string;
  range: string;
  phase: string;
  total: string;
  sessions: Session[];
};

const WEEKS: Week[] = [
  {
    id: 'W01', range: '08.31—09.06', phase: '进入节奏', total: '30 KM',
    sessions: [
      { id: 'w1-mon', day: '周一', date: '08.31', time: '19:00', kind: 'E', distance: '6 KM', title: '轻松跑', pace: "6'45\"—7'20\" /KM", detail: '把呼吸放轻，结束后做 8 分钟小腿与髋部拉伸。' },
      { id: 'w1-thu', day: '周四', date: '09.03', time: '19:00', kind: 'T', distance: '8 KM', title: '3 × 1 KM 稳态', pace: "5'50\"—6'00\" /KM", detail: '总时长约 50–55 分钟：2 km 热身（6分35–7分05/km）+ 3 × 1 km 稳态（5分50–6分00/km）；组间 400 m 慢跑，1–2 km 放松。每组 RPE 7/10，不冲刺；出发前 200–300 ml 水，周五可后备但不要叠加。' },
      { id: 'w1-sat', day: '周六', date: '09.05', time: '灵活', kind: 'OFF', distance: '—', title: '休息 / 灵活性', pace: '不补跑量', detail: '20 分钟灵活性练习，给周日长距离留出恢复空间。' },
      { id: 'w1-sun', day: '周日', date: '09.06', time: '早晨', kind: 'LR', distance: '16 KM', title: '长距离慢跑', pace: "6'45\"—7'15\" /KM", detail: '预计 1小时50–1小时56分；全程保持能说完整句子的强度。水 400–600 ml/h，小口每 15–20 分钟；钠 300–500 mg/h。目标碳水 30–35 g/h，第 35、75 分钟各 1 支胶，每支尽量配水。' },
    ],
  },
  {
    id: 'W02', range: '09.07—09.13', phase: '建立耐力', total: '35 KM',
    sessions: [
      { id: 'w2-mon', day: '周一', date: '09.07', time: '19:00', kind: 'REC', distance: '6 KM', title: '恢复跑', pace: "6'50\"—7'20\" /KM", detail: '全程能顺畅交谈，训练后不应留下明显疲劳。' },
      { id: 'w2-thu', day: '周四', date: '09.10', time: '19:00', kind: 'T', distance: '7 KM', title: '2 × 2 KM 稳态', pace: "5'55\"—6'05\" /KM", detail: '总时长约 45–50 分钟：1.5 km 热身 + 2 × 2 km 稳态（5分55–6分05/km）；组间 3 分钟慢跑，约 1 km 放松。前一组留余力、后一组保持同速；出发前 200–300 ml 水，周五可后备。' },
      { id: 'w2-sat', day: '周六', date: '09.12', time: '灵活', kind: 'E', distance: '4 KM', title: '轻松唤醒', pace: "6'50\"—7'20\" /KM", detail: '短而轻，不追配速；结束后保持腿部新鲜。' },
      { id: 'w2-sun', day: '周日', date: '09.13', time: '早晨', kind: 'LR', distance: '18 KM', title: '长距离慢跑', pace: "6'45\"—7'15\" /KM", detail: '预计 2小时02–2小时11分；前半程克制，后半程不追配速。水 400–600 ml/h，小口分次；钠 300–500 mg/h。目标碳水 35–40 g/h，第 30、65、100 分钟各 1 支胶，胶配水。' },
    ],
  },
  {
    id: 'W03', range: '09.14—09.20', phase: '阈值刺激', total: '39 KM',
    sessions: [
      { id: 'w3-mon', day: '周一', date: '09.14', time: '19:00', kind: 'REC', distance: '6 KM', title: '恢复跑', pace: "6'50\"—7'20\" /KM", detail: '只为促进恢复；若周日余疲明显，缩至 5 km。' },
      { id: 'w3-thu', day: '周四', date: '09.17', time: '19:00', kind: 'T', distance: '8 KM', title: '3 × 8 MIN 阈值', pace: "5'45\"—5'55\" /KM", detail: '总时长约 55–60 分钟：2 km 热身 + 3 × 8 分钟阈值（5分45–5分55/km）；组间 2 分钟慢跑，1.5–2 km 放松。RPE 7–8/10，第三组不加速；出发前 200–300 ml 水，周五可后备。' },
      { id: 'w3-sat', day: '周六', date: '09.19', time: '灵活', kind: 'E', distance: '5 KM', title: '轻松跑', pace: "6'50\"—7'20\" /KM", detail: '保持脚步轻快，不增加临时训练内容。' },
      { id: 'w3-sun', day: '周日', date: '09.20', time: '早晨', kind: 'LR', distance: '20 KM', title: '长距离慢跑', pace: "6'45\"—7'15\" /KM", detail: '预计 2小时15–2小时25分；全程以耐力体感为主，不把长跑跑成测试。水 400–650 ml/h，小口每 15–20 分钟；钠 300–500 mg/h。目标碳水 40–45 g/h，第 30、60、90、120 分钟各 1 支胶，胶配水。' },
    ],
  },
  {
    id: 'W04', range: '09.21—09.27', phase: '吸收恢复', total: '32 KM',
    sessions: [
      { id: 'w4-mon', day: '周一', date: '09.21', time: '19:00', kind: 'REC', distance: '6 KM', title: '恢复跑', pace: "6'50\"—7'20\" /KM", detail: '把强度压低，让前三周训练真正被身体吸收。' },
      { id: 'w4-thu', day: '周四', date: '09.24', time: '19:00', kind: 'MP', distance: '7 KM', title: '连续 4 KM 马配', pace: "6'20\"—6'25\" /KM", detail: '总时长约 45–50 分钟：2 km 热身 + 4 km 马配（6分20–6分25/km）+ 1 km 放松。回撤周只练节奏；若睡眠差、腿沉或动作散，改 6–7 km 轻松跑，周五可后备。' },
      { id: 'w4-sat', day: '周六', date: '09.26', time: '灵活', kind: 'E', distance: '4 KM', title: '轻松跑', pace: "6'50\"—7'20\" /KM", detail: '若睡眠或肌肉状态差，可直接休息。' },
      { id: 'w4-sun', day: '周日', date: '09.27', time: '早晨', kind: 'LR', distance: '15 KM', title: '回撤长跑', pace: "6'45\"—7'15\" /KM", detail: '预计 1小时41–1小时49分；这是吸收周，宁可慢也不追距离。水 300–500 ml/h；钠 300–500 mg/h。目标碳水约 30 g/h，第 35、75 分钟各 1 支胶，胶配水。' },
    ],
  },
  {
    id: 'W05', range: '09.28—10.04', phase: '延长耐力', total: '42 KM',
    sessions: [
      { id: 'w5-mon', day: '周一', date: '09.28', time: '19:00', kind: 'REC', distance: '7 KM', title: '恢复跑', pace: "6'50\"—7'20\" /KM", detail: '保持低心率；训练后补充水分和正常晚餐。' },
      { id: 'w5-thu', day: '周四', date: '10.01', time: '19:00', kind: 'E', distance: '8 KM', title: '轻松跑 + 4 × 20 秒', pace: "6'15\"—6'40\" /KM", detail: '总时长约 50–55 分钟：6–7 km 轻松跑（6分15–6分40/km）后做 4 × 20 秒加速；每次 60–90 秒走/慢跑恢复，只找步频和姿态，不冲刺。出发前 200–300 ml 水，周五可后备。' },
      { id: 'w5-sat', day: '周六', date: '10.03', time: '灵活', kind: 'E', distance: '5 KM', title: '轻松跑', pace: "6'50\"—7'20\" /KM", detail: '为次日 22 km 做轻量唤醒。' },
      { id: 'w5-sun', day: '周日', date: '10.04', time: '早晨', kind: 'LR+', distance: '22 KM', title: '长跑 / 末 4 KM 马配', pace: "前 18 KM 6'40\"—7'05\" → 末 4 KM 6'20\"—6'25\" /KM", detail: '预计 2小时25–2小时35分：前 18 km 轻松耐力，末 4 km 进入马配但不冲刺。水 400–700 ml/h，小口每 15–20 分钟；钠 300–600 mg/h。目标碳水 45–50 g/h，第 25、55、85、115、145 分钟各 1 支胶，胶配水。' },
    ],
  },
  {
    id: 'W06', range: '10.05—10.11', phase: '负荷上升', total: '46 KM',
    sessions: [
      { id: 'w6-mon', day: '周一', date: '10.05', time: '19:00', kind: 'REC', distance: '7 KM', title: '恢复跑', pace: "6'50\"—7'20\" /KM", detail: '前一日后程加速后，把恢复放在第一位。' },
      { id: 'w6-thu', day: '周四', date: '10.08', time: '19:00', kind: 'T', distance: '9 KM', title: '4 × 1 KM 阈值', pace: "5'45\"—5'55\" /KM", detail: '总时长约 55–60 分钟：2 km 热身 + 4 × 1 km 阈值（5分45–5分55/km）；组间 400 m 慢跑，1.5–2 km 放松。RPE 7–8/10，四组配速尽量均匀；出发前 200–300 ml 水，周五可后备。' },
      { id: 'w6-sat', day: '周六', date: '10.10', time: '灵活', kind: 'E', distance: '5 KM', title: '轻松跑', pace: "6'50\"—7'20\" /KM", detail: '保持克制，确认长跑鞋袜与补给携带方式。' },
      { id: 'w6-sun', day: '周日', date: '10.11', time: '早晨', kind: 'LR', distance: '25 KM', title: '长距离慢跑', pace: "6'45\"—7'15\" /KM", detail: '预计 2小时50–3小时05分；保持均匀慢跑，不在最后加速。水 500–700 ml/h，小口每 15–20 分钟；钠 300–600 mg/h。目标碳水 50–55 g/h，第 25、50、75、100、125、150 分钟各 1 支胶，每支尽量配水。' },
    ],
  },
  {
    id: 'W07', range: '10.12—10.18', phase: '峰值周', total: '48–50 KM',
    sessions: [
      { id: 'w7-mon', day: '周一', date: '10.12', time: '19:00', kind: 'REC', distance: '7 KM', title: '恢复跑', pace: "6'50\"—7'20\" /KM", detail: '不测试速度，专注恢复与正常进食。' },
      { id: 'w7-thu', day: '周四', date: '10.15', time: '19:00', kind: 'MP', distance: '9 KM', title: '连续 6 KM 马配', pace: "6'20\"—6'25\" /KM", detail: '总时长约 58–62 分钟：2 km 热身 + 6 km 马配（6分20–6分25/km）+ 1 km 放松。前 2 km 要克制，整段不提前加速；出发前 200–300 ml 水，周五可后备但不要叠加。' },
      { id: 'w7-sat', day: '周六', date: '10.17', time: '灵活', kind: 'E', distance: '4 KM', title: '超轻松跑', pace: "6'55\"—7'25\" /KM", detail: '若腿沉，直接休息；不影响周日峰值长跑。' },
      { id: 'w7-sun', day: '周日', date: '10.18', time: '早晨', kind: 'PEAK', distance: '28–30 KM', title: '峰值 LSD / 末段稳态', pace: "前 22–24 KM 6'40\"—7'05\" → 末 4–6 KM 6'25\"—6'35\" /KM", detail: '预计 3小时10–3小时20分，30 km 或 3小时20分先到即停。前 22–24 km 做耐力，只有动作稳定、呼吸可控才做末 4–6 km 稳态；腿沉就全程轻松。水 500–750 ml/h，小口每 15–20 分钟；钠 300–600 mg/h。目标碳水 55–60 g/h，从第 20 分钟起每 25–30 分钟 1 支（约 20/50/80/110/140/170 分钟，接近 3小时20分再补第 8 支），每支胶配水。' },
    ],
  },
  {
    id: 'W08', range: '10.19—10.25', phase: '专项巩固', total: '39 KM',
    sessions: [
      { id: 'w8-mon', day: '周一', date: '10.19', time: '19:00', kind: 'REC', distance: '7 KM', title: '恢复跑', pace: "6'50\"—7'20\" /KM", detail: '峰值周后的第一目标是把疲劳卸下来。' },
      { id: 'w8-thu', day: '周四', date: '10.22', time: '19:00', kind: 'E', distance: '7 KM', title: '峰值后恢复跑', pace: "6'45\"—7'15\" /KM", detail: '总时长约 48–54 分钟：7 km 轻松跑，能完整说话，不加速、不测试心率。若峰值长跑后仍腿沉，缩至 5 km 或休息；周五可后备。' },
      { id: 'w8-sat', day: '周六', date: '10.24', time: '灵活', kind: 'E', distance: '4 KM', title: '轻松跑', pace: "6'50\"—7'20\" /KM", detail: '短时唤醒，准备次日最后一堂专项长跑。' },
      { id: 'w8-sun', day: '周日', date: '10.25', time: '早晨', kind: 'LR+', distance: '21 KM', title: '长跑 / 末 6 KM 马配', pace: "前 15 KM 6'45\"—7'10\" → 末 6 KM 6'20\"—6'25\" /KM", detail: '预计 2小时15–2小时25分：前 15 km 轻松，末 6 km 稳定进入马配，保持动作不散。水 400–700 ml/h，小口每 15–20 分钟；钠 300–600 mg/h。目标碳水约 50 g/h，第 25、55、85、115 分钟各 1 支胶，若超过 2小时20分再补第 5 支，胶配水。' },
    ],
  },
  {
    id: 'W09', range: '10.26—11.01', phase: '开始减量', total: '31 KM',
    sessions: [
      { id: 'w9-mon', day: '周一', date: '10.26', time: '19:00', kind: 'REC', distance: '6 KM', title: '恢复跑', pace: "6'50\"—7'20\" /KM", detail: '减量不是停跑，维持规律但主动降低负荷。' },
      { id: 'w9-thu', day: '周四', date: '10.29', time: '19:00', kind: 'MP', distance: '7 KM', title: '连续 3 KM 马配', pace: "6'20\"—6'25\" /KM", detail: '总时长约 45–50 分钟：2 km 热身 + 3 km 马配（6分20–6分25/km）+ 2 km 放松。只找节奏，不追快；若减量周仍有疲劳，改 6 km 轻松跑，周五可后备。' },
      { id: 'w9-sat', day: '周六', date: '10.31', time: '灵活', kind: 'E', distance: '4 KM', title: '轻松跑', pace: "6'50\"—7'20\" /KM", detail: '全程轻松，睡眠和碳水优先。' },
      { id: 'w9-sun', day: '周日', date: '11.01', time: '早晨', kind: 'LR', distance: '14 KM', title: '减量长跑', pace: "6'45\"—7'15\" /KM", detail: '预计 1小时36–1小时42分；全程轻松，给比赛周留下新鲜度。水 300–500 ml/h；钠 300–500 mg/h。目标碳水约 30 g/h，第 35、75 分钟各 1 支胶，胶配水。' },
    ],
  },
  {
    id: 'W10', range: '11.02—11.08', phase: '比赛周', total: 'RACE',
    sessions: [
      { id: 'w10-mon', day: '周一', date: '11.02', time: '19:00', kind: 'E', distance: '5 KM', title: '轻松跑 + 4 × 20 秒', pace: "6'50\"—7'20\" /KM", detail: '只做神经唤醒，不追求速度或心率数字。' },
      { id: 'w10-thu', day: '周四', date: '11.05', time: '19:00', kind: 'MP', distance: '5 KM', title: '含 2 KM 马配', pace: "6'20\"—6'25\" /KM", detail: '总时长约 31–34 分钟：1.5 km 热身 + 2 km 马配（6分20–6分25/km）+ 1.5 km 放松。只做神经唤醒，不测试能力；出发前 200–300 ml 水，周五不补课。' },
      { id: 'w10-sat', day: '周六', date: '11.07', time: '灵活', kind: 'SHAKE', distance: '0–2 KM', title: '可选唤醒 / 完全休息', pace: '15–20 MIN', detail: '只在身体习惯时慢跑；整理号码布、芯片、胶和早餐。' },
      { id: 'w10-race', day: '周日', date: '11.08', time: '07:30', kind: 'RACE', distance: '42.195 KM', title: '合肥马拉松', pace: "均配 6'24\" /KM", detail: '预计 4小时30分：0–5 km 6分30–6分35/km，5–30 km 6分22–6分25/km，30 km 后按动作和体感守住节奏。水 400–700 ml/h，小口随补给站分次；钠 300–600 mg/h。目标碳水 50–60 g/h，第 20 分钟起约每 30 分钟 1 支（约 20/50/80/110/140/170/200/230/260 分钟，共约 9 支），每支胶配水，只用已测试的产品。' },
    ],
  },
];

const CODED_COMPLETED: Record<string, boolean> = {
  'w1-mon': true,
  'w1-thu': true,
  'w1-sat': true,
  'w1-sun': true,
};
const CODED_NOTES: Record<string, string> = {
  W01: '前一周周末没有跑步，所以本次还是按 10km 跑的；配速 6分06秒/km，体感舒服。',
};
const RACE_TIME = new Date('2026-11-08T07:30:00+08:00').getTime();
const daysUntilRace = () => Math.max(0, Math.ceil((RACE_TIME - Date.now()) / 86_400_000));
const WEEK_STARTS = ['2026-08-31', '2026-09-07', '2026-09-14', '2026-09-21', '2026-09-28', '2026-10-05', '2026-10-12', '2026-10-19', '2026-10-26', '2026-11-02'].map((date) => new Date(`${date}T00:00:00+08:00`).getTime());
const currentWeekIndex = () => {
  const now = Date.now();
  if (now < WEEK_STARTS[0]) return 0;
  const index = WEEK_STARTS.findLastIndex((start) => now >= start);
  return Math.min(WEEKS.length - 1, Math.max(0, index));
};

const FUELING = [
  { date: '09.06', distance: '16 KM', carbs: '30–35', gels: '2', timing: '35 / 75 MIN' },
  { date: '09.13', distance: '18 KM', carbs: '35–40', gels: '3', timing: '30 / 65 / 100 MIN' },
  { date: '09.20', distance: '20 KM', carbs: '40–45', gels: '4', timing: '30 / 60 / 90 / 120 MIN' },
  { date: '09.27', distance: '15 KM', carbs: '≈30', gels: '2', timing: '35 / 75 MIN' },
  { date: '10.04', distance: '22 KM', carbs: '45–50', gels: '5', timing: '25 / 55 / 85 / 115 / 145 MIN' },
  { date: '10.11', distance: '25 KM', carbs: '50–55', gels: '6', timing: '25 MIN 起，每 25 MIN' },
  { date: '10.18', distance: '28–30 KM', carbs: '55–60', gels: '7–8', timing: '20 / 50 / 80 / 110 / 140 / 170 MIN；接近 3:20 再补第 8 支' },
  { date: '10.25', distance: '21 KM', carbs: '≈50', gels: '5', timing: '25 / 55 / 85 / 115 MIN；超过 2:20 再补第 5 支' },
  { date: '11.01', distance: '14 KM', carbs: '≈30', gels: '2', timing: '35 / 75 MIN' },
  { date: '11.08', distance: '42.195 KM', carbs: '50–60', gels: '≈9', timing: '20 / 50 / 80 / 110 / 140 / 170 / 200 / 230 / 260 MIN' },
];

export default function Home() {
  const actualWeek = currentWeekIndex();
  const [selectedWeek, setSelectedWeek] = useState(actualWeek);
  const [countdown, setCountdown] = useState(0);
  const completed = CODED_COMPLETED;
  const notes = CODED_NOTES;

  useEffect(() => {
    setCountdown(daysUntilRace());
  }, []);

  const week = WEEKS[selectedWeek];
  const completedCount = useMemo(
    () => week.sessions.filter((session) => completed[session.id]).length,
    [completed, week.sessions],
  );
  const totalCompleted = useMemo(
    () => WEEKS.flatMap((item) => item.sessions).filter((session) => completed[session.id]).length,
    [completed],
  );
  const totalSessions = WEEKS.reduce((sum, item) => sum + item.sessions.length, 0);
  const nextSession = week.sessions.find((session) => !completed[session.id]);

  return (
    <main className="page">
      <div className="plan-shell" id="top">
      <aside className="goal-spine" aria-label="比赛目标">
        <div className="spine-mark">430 / HEFEI</div>
        <div className="goal-lockup">
          <span className="goal-hour">4</span><span className="goal-colon">:</span><span className="goal-minutes">30</span>
        </div>
        <div className="goal-caption">FINISH TARGET</div>
        <dl className="goal-facts">
          <div><dt>目标配速</dt><dd>6&apos;24&quot; /KM</dd></div>
          <div><dt>发枪</dt><dd>2026.11.08 / 07:30</dd></div>
          <div><dt>地点</dt><dd>合肥 · 全程马拉松</dd></div>
        </dl>
        <div className="race-stamp" aria-label={`距离比赛还有 ${countdown} 天`}><span>{countdown}</span><small>DAYS TO GO</small></div>
      </aside>

      <section className="route-board" aria-labelledby="route-title">
        <header className="route-header">
          <div>
            <h1 id="route-title">十周，测绘一条通往终点的线。</h1>
            <p>训练不是堆里程。每一次轻松跑、马配和长距离，都在校准 11 月 8 日的 42.195 km。</p>
          </div>
          <div className="race-coordinates" aria-label="比赛信息">
            <MapPin aria-hidden="true" /><span>HEFEI, CN</span><span>31.8206°N / 117.2272°E</span>
          </div>
        </header>

        <div className="survey-route" aria-label="十周训练路线">
          <svg viewBox="0 0 920 172" role="img" aria-label="从第一周到比赛周的训练进程">
            <path className="contour contour-a" d="M0 111C92 68 153 154 248 100S409 64 483 108s142 39 203-8 138-41 234-73" />
            <path className="contour contour-b" d="M0 136c100-58 163 34 257-12s159-62 235-14 124 45 201 2 143-39 227-58" />
            <path className="route-line" pathLength="1" d="M16 120C114 79 172 146 260 106s146-56 230-16 126 49 204 5 134-48 210-62" />
          </svg>
          <div className="week-points">
            {WEEKS.map((item, index) => (
              <button type="button" key={item.id} onClick={() => setSelectedWeek(index)} className={index === selectedWeek ? 'week-point is-active' : 'week-point'} aria-pressed={index === selectedWeek} aria-label={`${item.id} ${item.range} ${item.phase}`}>
                <span className="point-dot" /><strong>{item.id}</strong><small>{item.total}</small>
              </button>
            ))}
          </div>
        </div>

        <section className="week-sheet" aria-labelledby="week-title">
          <div className="week-sheet-head">
            <div><span>{week.id} / {week.range}{selectedWeek === actualWeek ? ' / 当前周' : ''}</span><h2 id="week-title">{week.phase}</h2>{nextSession && <p className="next-session">下一课 · {nextSession.day} {nextSession.time} · {nextSession.title}</p>}</div>
            <div className="week-progress" aria-live="polite"><strong>{completedCount}/{week.sessions.length || '—'}</strong><span>{selectedWeek === actualWeek ? '当前周完成' : '所选周完成'}</span></div>
          </div>
          {week.sessions.length ? (
            <div className="session-list">
              {week.sessions.map((session) => (
                <label className="session-row" key={session.id}>
                  <Checkbox checked={Boolean(completed[session.id])} disabled className="session-check" />
                  <span className="session-date"><b>{session.day}</b><small>{session.date} / {session.time}</small></span>
                  <span className="session-kind">{session.kind}</span>
                  <span className="session-main"><b>{session.title}</b><small>{session.detail}</small></span>
                  <span className="session-metric"><b>{session.distance}</b><small>{session.pace}</small></span>
                </label>
              ))}
            </div>
          ) : (
            <div className="coming-week"><Flag aria-hidden="true" /><div><strong>完整周计划正在展开</strong><p>首屏已锁定，下一步将接入剩余九周和全部补给表。</p></div></div>
          )}
        </section>
      </section>

      <aside className="field-notes" aria-labelledby="notes-title">
        <div className="notes-meta"><Clock3 aria-hidden="true" /><span>CODED NOTE</span><b aria-live="polite">计划记录</b></div>
        <h2 id="notes-title">本周手记</h2>
        <p>训练记录由计划代码固定，后续根据你的反馈更新发布。</p>
        <Textarea value={notes[week.id] ?? ''} readOnly aria-label={`${week.id} 训练备注`} className="notes-area" />
        <div className="notes-footer"><span>STATIC / CODE</span><span>{(notes[week.id] ?? '').length} CHAR</span></div>
        <blockquote>“稳住前半程，30 km 后才开始比赛。”</blockquote>
      </aside>
      </div>

      <nav className="section-index" aria-label="页面索引">
        <a href="#ten-week-plan">十周任务表</a>
        <a href="#fueling-plan">长跑补给</a>
        <a href="#pace-guide">配速与比赛执行</a>
        <span>{totalCompleted}/{totalSessions} SESSION LOGGED</span>
      </nav>

      <section className="ledger" id="ten-week-plan" aria-labelledby="ledger-title">
        <header className="section-heading">
          <h2 id="ledger-title">把十周摊开看。</h2>
          <p>周四为首选质量课，周五晚是后备。周末可灵活交换轻松跑与休息，但长距离前一天不补强度。</p>
        </header>
        <div className="ledger-rule" aria-hidden="true"><span style={{ transform: `scaleX(${totalCompleted / totalSessions})` }} /></div>
        <div className="ledger-weeks">
          {WEEKS.map((item, weekIndex) => {
            const done = item.sessions.filter((session) => completed[session.id]).length;
            return (
              <article className="ledger-week" key={item.id}>
                <button type="button" className="ledger-week-head" onClick={() => { setSelectedWeek(weekIndex); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label={`在顶部查看 ${item.id} 与计划记录`}>
                  <span className="ledger-week-id">{item.id}</span>
                  <span><b>{item.phase}</b><small>{item.range}</small></span>
                  <span className="ledger-total">{item.total}</span>
                  <span className="ledger-count">{done}/{item.sessions.length}</span>
                </button>
                <div className="ledger-session-grid">
                  {item.sessions.map((session) => (
                    <label className="ledger-session" key={session.id}>
                      <Checkbox checked={Boolean(completed[session.id])} disabled className="ledger-check" />
                      <span><b>{session.day} · {session.kind}</b><small>{session.title}</small></span>
                      <strong>{session.distance}</strong>
                    </label>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="fuel-manifest" id="fueling-plan" aria-labelledby="fuel-title">
        <header className="fuel-heading">
          <h2 id="fuel-title">长跑时，按小时给身体供能。</h2>
          <p>这里的碳水目标是跑动过程中胶与运动饮料的合计，不包含跑前早餐。表中胶数按每支约 25 g 碳水估算；请以你所用产品包装为准，并用运动饮料补足差额。每支胶尽量配水，不要一次猛灌。</p>
          <p className="fuel-formula"><b>换算</b> 每小时总碳水 = 每支胶克数 × 每小时支数 + 运动饮料碳水。若每支只有 20 g，比赛计划中的饮料需额外补足约 10 g/h。所有组合先在长跑中测试，再按天气与胃肠耐受调整。</p>
          <p className="fuel-formula"><b>补水 / 电解质</b> 温和天气先以 400–700 ml/h、钠 300–600 mg/h 为起点，小口每 15–20 分钟分次；热天或出汗多按个人失汗和产品标签调整。短于 60 分钟的周四质量课通常以跑前补水为主，不在课中强行补胶。</p>
          <div className="fuel-key"><span>30</span><i /><span>45</span><i /><span>60 G / H</span></div>
        </header>
        <div className="fuel-table-wrap">
          <p className="swipe-hint">左右滑动查看完整补给时间 →</p>
          <table className="fuel-table">
            <caption className="sr-only">长距离跑与比赛日的每小时碳水、能量胶数量和服用时间</caption>
            <thead><tr><th scope="col">日期 / 距离</th><th scope="col">碳水 G/H</th><th scope="col">胶</th><th scope="col">建议时间点</th></tr></thead>
            <tbody>
              {FUELING.map((item, index) => (
                <tr className={index === FUELING.length - 1 ? 'is-race' : ''} key={item.date}>
                  <th scope="row"><b>{item.date}</b><small>{item.distance}</small></th>
                  <td><span className="carb-meter"><b>{item.carbs}</b><i style={{ width: `${Math.min(100, 28 + index * 7)}%` }} /></span></td>
                  <td className="gel-count">× {item.gels}</td>
                  <td>{item.timing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pace-guide" id="pace-guide" aria-labelledby="pace-title">
        <header className="section-heading pace-heading">
          <h2 id="pace-title">配速不是命令，是四种手感。</h2>
          <p>天气、路况和疲劳会让数字漂移。先守住对应强度，再看手表；疼痛改变动作时停止训练，而不是完成打勾。</p>
        </header>
        <div className="pace-ruler">
          <div><span>E / REC</span><strong>6&apos;45&quot;—7&apos;20&quot;</strong><p>轻松与恢复。能完整说话，第二天不留重疲劳。</p></div>
          <div><span>LR</span><strong>6&apos;45&quot;—7&apos;15&quot;</strong><p>长距离。前半程克制，重点练习耐力与补给。</p></div>
          <div><span>MP</span><strong>6&apos;20&quot;—6&apos;25&quot;</strong><p>目标马拉松配速。稳定、可控，不跑成阈值课。</p></div>
          <div><span>T</span><strong>5&apos;45&quot;—5&apos;55&quot;</strong><p>阈值间歇。呼吸明显用力，但每组动作不散。</p></div>
        </div>

        <aside className="goal-gates" aria-labelledby="goal-gates-title">
          <div><span>DEFAULT TARGET</span><strong>4:30</strong><p>默认锁定 4:30。训练完成度不足时不补课、不临时抬目标。</p></div>
          <div>
            <h3 id="goal-gates-title">只有同时通过三道门，才评估 4:20–4:25。</h3>
            <ul>
              <li>W07 的 28–30 km 峰值长跑在 3:20 上限内完成，后程动作没有明显散掉。</li>
              <li>W08 的 21 km 含末 6 km 马配可控，隔天没有异常疼痛或持续重疲劳。</li>
              <li>55–60 g/h 的比赛补给在长跑中耐受，胶、饮料和携带方式都已验证。</li>
            </ul>
            <p>任一项未通过，就继续执行 4:30。尖锐疼痛、动作变形、连续恢复不良或长跑缺课时，下一周降量约 20%–30%，取消质量课，优先恢复。</p>
          </div>
        </aside>

        <div className="race-execution">
          <div className="race-number"><span>RACE DAY</span><strong>42.195</strong><small>KM / 2026.11.08 / 07:30</small></div>
          <ol>
            <li><span>0—5 KM</span><b>6&apos;30&quot;—6&apos;35&quot;</b><p>让人群先走，心率和呼吸稳定后再进入目标节奏。</p></li>
            <li><span>5—30 KM</span><b>6&apos;22&quot;—6&apos;25&quot;</b><p>稳定巡航，补给优先于抢回几秒；半程约 2:15。</p></li>
            <li><span>30—37 KM</span><b>守住体感</b><p>不主动加速。姿态、步频、补水逐项检查。</p></li>
            <li><span>37—42.195 KM</span><b>有余力再提</b><p>能维持动作再逐步加速；否则守住 4:30 完赛线。</p></li>
          </ol>
        </div>
      </section>

      <footer className="plan-footer">
        <span>430 / HEFEI</span>
        <p>计划是路线，不是债务。生病、尖锐疼痛或动作变形时，删掉一课比补回一课更接近终点。</p>
        <div className="plan-footer-actions">
          <a className="icp-link" href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">皖ICP备2026029973号-1</a>
          <a className="back-to-top" href="#top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>返回起点 ↑</a>
        </div>
      </footer>
    </main>
  );
}
