// StageOS 内置舞台知识库(代码内 RAG 语料)。
// 按节目类型原型(archetype)组织:队形模板 × 服装款式 × 配色方案。
// 前端(mock 兜底 / 队形快选)与边缘函数(AI prompt 注入)共用本文件,保持单一事实来源。
// 可同时在浏览器 / Node / Deno 环境运行(仅依赖同目录 palette-library 的 853 色库色名表)。

import { PALETTE_COLORS } from "./palette-library.ts";

export type FormationTemplate = {
  /** 布局名,如 "三排阶梯式" */
  name: string;
  /** 队形摘要(一句话) */
  summary: string;
  /** 建议行数 */
  rows: number;
  /** 间距规则 */
  spacingRule: string;
  /** 适用人数范围 [min, max] */
  countRange: [number, number];
  /** 使用要点 */
  tips: string;
  /** 是否来自通用队形池(跨节目类型可迁移) */
  universal?: boolean;
  /** 氛围/主题关键词,用于与 programTheme 相关性排序 */
  tags?: string[];
};

export type CostumeStyle = {
  /** 款式名,如 "水墨长衫" */
  name: string;
  /** 女生款式描述 */
  female: string;
  /** 男生款式描述 */
  male: string;
  /** 建议配饰 */
  accessories: string[];
  /** 适用氛围/主题关键词 */
  moods: string[];
};

export type ColorPalette = {
  /** 方案名,如 "青瓷烫金" */
  name: string;
  /** 主色(中文色名) */
  primary: string;
  /** 主色精确 HEX,用于 UI 渲染与 AI 颜色规格 */
  primaryHex: string;
  /** 辅色(中文色名) */
  secondary: string;
  /** 辅色精确 HEX */
  secondaryHex: string;
  /** 点缀色(中文色名) */
  accent: string;
  /** 点缀色精确 HEX */
  accentHex: string;
  /** 色系归属关键词,用于与 screenThemeColor 匹配 */
  family: string[];
  /** 舞台效果说明 */
  note: string;
};

export type ProgramKnowledge = {
  /** 覆盖的节目类型 value 列表(对应 PROGRAM_TYPES) */
  programTypes: string[];
  /** 原型名 */
  archetype: string;
  formations: FormationTemplate[];
  costumeStyles: CostumeStyle[];
  palettes: ColorPalette[];
};

export const STAGE_KNOWLEDGE: ProgramKnowledge[] = [
  {
    programTypes: ["chorus", "mixed_chorus"],
    archetype: "合唱",
    formations: [
      { name: "三排阶梯式", summary: "前中后三排,按身高由矮到高阶梯站位", rows: 3, spacingRule: "左右间距 60cm,前后台阶落差 20cm", countRange: [15, 45], tips: "领唱居中前排,声部按左高右低分区。" },
      { name: "弧形环抱式", summary: "两排弧线面向指挥呈环抱状", rows: 2, spacingRule: "弧线弦距 55cm,排间 90cm", countRange: [10, 30], tips: "适合中小型合唱,声场更聚拢。" },
      { name: "四排大合唱式", summary: "四排横列配合唱台,气势型站位", rows: 4, spacingRule: "左右 55cm,逐排增高 25cm", countRange: [40, 80], tips: "需要合唱台架,末排注意安全护栏。" },
      { name: "中心领唱放射式", summary: "领唱居中,声部呈放射状展开", rows: 3, spacingRule: "放射间隔 65cm,中心留 1.5m 表演区", countRange: [20, 50], tips: "适合有独唱/领唱段落的曲目。" },
      // 以下 3 套沉淀自《超燃青春的合唱》(2026 爱奇艺) 舞台设计调研公式库 A
      { name: "SATB四声部半圆式", summary: "半圆弧 3-4 层,女高在前、男低最后最高,声部即建筑", rows: 4, spacingRule: "浅弧半径约 3m,每排间 60-80cm,人距 1.5 肩宽", countRange: [25, 40], tips: "女高=屋顶/女中=墙壁/男高=承重墙/男低=地基;半圆保证全员看到指挥;声部内高个居中矮个两侧。" },
      { name: "双阵营对抗式", summary: "左右双阵营留 2m 中央通道,高潮段落向中心合龙", rows: 2, spacingRule: "两阵营各占半台,中间通道 2m,组内人距 70cm", countRange: [16, 50], tips: "适合跨班 PK/主题赛;编排『分-合-分』三段走位,合龙点对应副歌最后一句;通道即领唱 solo 位。" },
      { name: "毕业满弧式", summary: "接近 3/4 圆的满弧群像,核心 solo 居中偏后", rows: 2, spacingRule: "满弧人距一臂宽,solo 位后方留大屏/顶光空间", countRange: [20, 60], tips: "毕业典礼/汇演压轴专用;满弧是合唱的原始母形,配顶光+烟雾成『群像即仪式』画面。" },
    ],
    costumeStyles: [
      { name: "经典礼服式", female: "齐踝纯色礼服裙,泡泡袖或飘带袖", male: "白衬衫 + 马甲 + 西裤 + 领结", accessories: ["同色腰封", "胸花"], moods: ["庄重", "经典", "颂歌"] },
      { name: "国风襦裙式", female: "改良襦裙,渐变水袖", male: "立领盘扣长衫 + 直筒裤", accessories: ["发簪或发带", "云纹腰带"], moods: ["国风", "古诗词", "民歌"] },
      { name: "清新学院式", female: "百褶裙 + 针织背心 + 白衬衫", male: "白衬衫 + 针织背心 + 卡其裤", accessories: ["领结/领带", "白袜白鞋"], moods: ["青春", "校园", "轻快"] },
      { name: "星空梦幻式", female: "亮片渐变纱裙", male: "深色衬衫 + 微亮面马甲", accessories: ["星光发夹", "荧光手环"], moods: ["梦幻", "夜空", "科幻"] },
    ],
    palettes: [
      { name: "月白靛蓝", primary: "月白", primaryHex: "#D6ECF0", secondary: "靛蓝", secondaryHex: "#1F3C88", accent: "银灰", accentHex: "#C0C5CE", family: ["蓝", "白", "靛", "青"], note: "冷色安静聚焦,适合抒情曲目与冷光。" },
      { name: "朱砂鎏金", primary: "朱红", primaryHex: "#C3272B", secondary: "鎏金", secondaryHex: "#C89B40", accent: "米白", accentHex: "#F5F1E8", family: ["红", "金", "朱", "橙"], note: "喜庆恢弘,适合颂歌与节庆晚会暖光。" },
      { name: "青瓷竹影", primary: "青瓷绿", primaryHex: "#7FB8A4", secondary: "竹青", secondaryHex: "#789262", accent: "烫金", accentHex: "#C9A34E", family: ["绿", "青", "瓷"], note: "国风雅致,与水墨背景屏相得益彰。" },
      { name: "星夜紫罗", primary: "深紫", primaryHex: "#4B2E83", secondary: "藏蓝", secondaryHex: "#2E4E7E", accent: "银白", accentHex: "#E5E7EB", family: ["紫", "蓝", "黑"], note: "梦幻深邃,配合星空追光效果好。" },
    ],
  },
  {
    programTypes: ["recitation", "host"],
    archetype: "朗诵/主持",
    formations: [
      { name: "一字排开式", summary: "单排横列,话筒位等距分布", rows: 1, spacingRule: "人距 80cm,距台口 2m", countRange: [2, 12], tips: "领诵站中轴,注意话筒高度分档。" },
      { name: "双排错落式", summary: "前后两排错位站立,层次感强", rows: 2, spacingRule: "错位半肩位,排间 1m", countRange: [8, 24], tips: "前排持稿或空手,后排统一姿态。" },
      { name: "阶梯诵读式", summary: "三级台阶纵深布局,配合灯光分区亮起", rows: 3, spacingRule: "台阶落差 25cm,左右 70cm", countRange: [12, 36], tips: "适合章节式长诗,按段落分区起立。" },
    ],
    costumeStyles: [
      { name: "白衣胜雪式", female: "白色长裙,红色披肩或飘带", male: "白衬衫 + 深色西裤 + 红围巾", accessories: ["红色胸花", "白手套(可选)"], moods: ["爱国", "庄重", "纪念"] },
      { name: "青衿书生式", female: "淡青襦裙,手持书卷", male: "月白长衫 + 折扇", accessories: ["书卷道具", "束发带"], moods: ["古诗词", "国学", "书香"] },
      { name: "正装主持式", female: "及膝礼服裙或西装套裙", male: "全套西装 + 领带", accessories: ["胸针", "口袋巾"], moods: ["主持", "礼仪", "晚会"] },
    ],
    palettes: [
      { name: "红白经典", primary: "正红", primaryHex: "#C8102E", secondary: "纯白", secondaryHex: "#FFFFFF", accent: "金", accentHex: "#D4AF37", family: ["红", "白"], note: "爱国朗诵首选,追光下对比强烈。" },
      { name: "黛青月白", primary: "黛青", primaryHex: "#425066", secondary: "月白", secondaryHex: "#D6ECF0", accent: "黛蓝", accentHex: "#33507A", family: ["青", "蓝", "白", "黛"], note: "古典诗词氛围,配古琴伴奏尤佳。" },
      { name: "香槟金黑", primary: "香槟金", primaryHex: "#E6CFA3", secondary: "曜石黑", secondaryHex: "#14141A", accent: "米白", accentHex: "#F5F1E8", family: ["金", "黑", "香槟"], note: "晚会主持质感配色,大屏暖光适配。" },
    ],
  },
  {
    programTypes: ["drama"],
    archetype: "戏剧/话剧",
    formations: [
      { name: "场景区块式", summary: "按剧情场景划分舞台左中右三区", rows: 2, spacingRule: "区块间留 1.5m 走位通道", countRange: [5, 30], tips: "群演背景区靠后,主角区留追光位。" },
      { name: "环形群像式", summary: "群演围合成环,主角居中", rows: 2, spacingRule: "环半径按台深 1/3,人距 70cm", countRange: [8, 25], tips: "开场/闭幕群像定格效果好。" },
      { name: "斜线纵深式", summary: "对角斜线站位制造纵深透视", rows: 1, spacingRule: "斜线人距 90cm,首尾对角", countRange: [4, 15], tips: "适合行进/对峙类剧情段落。" },
    ],
    costumeStyles: [
      { name: "年代写实式", female: "按剧本年代:旗袍/列宁装/连衣裙", male: "长衫/中山装/工装", accessories: ["剧情道具", "年代帽饰"], moods: ["历史", "红色经典", "年代"] },
      { name: "童话夸张式", female: "高饱和拼色斗篷裙", male: "亮色马甲 + 灯笼裤", accessories: ["夸张头饰", "彩色假发(可选)"], moods: ["童话", "寓言", "低学段"] },
      { name: "现代简约式", female: "纯色打底 + 标志性单品区分角色", male: "同色系打底 + 角色标识外套", accessories: ["角色牌", "单色围巾"], moods: ["现代", "校园剧", "小品"] },
    ],
    palettes: [
      { name: "怀旧棕灰", primary: "咖棕", primaryHex: "#6B4A2E", secondary: "烟灰", secondaryHex: "#9CA3AF", accent: "军绿", accentHex: "#4B5D3A", family: ["棕", "灰", "绿"], note: "年代剧沉稳基调,暖黄面光适配。" },
      { name: "高糖撞色", primary: "柠檬黄", primaryHex: "#FDE047", secondary: "湖蓝", secondaryHex: "#2CA3CF", accent: "桃粉", accentHex: "#F4A7B9", family: ["黄", "蓝", "粉"], note: "童话剧高识别度,角色区分度高。" },
      { name: "黑白金焦点", primary: "黑", primaryHex: "#111111", secondary: "白", secondaryHex: "#FFFFFF", accent: "金", accentHex: "#D4AF37", family: ["黑", "白", "金"], note: "现代剧极简,靠灯光与道具点色。" },
    ],
  },
  {
    programTypes: ["classical_dance", "folk_dance"],
    archetype: "古典/民族舞",
    formations: [
      { name: "扇形绽放式", summary: "以领舞为心呈扇形展开,层层绽放", rows: 3, spacingRule: "扇形弧距 80cm,层间 1.2m", countRange: [12, 32], tips: "水袖/绸扇道具与扇形呼应最佳。" },
      { name: "斜排流水式", summary: "双斜排交错,如流水交汇", rows: 2, spacingRule: "斜排人距 1m,交汇区留 2m", countRange: [10, 24], tips: "适合圆场步流动调度。" },
      { name: "圆阵团花式", summary: "同心双圆,内圈外圈反向旋转", rows: 2, spacingRule: "内圈半径 2m,外圈 3.5m", countRange: [16, 36], tips: "俯拍镜头下呈团花图案。" },
      { name: "雁阵斜飞式", summary: "人字雁阵,领舞居尖", rows: 3, spacingRule: "雁翼间距 90cm,前后错半步", countRange: [9, 21], tips: "民族舞蒙古族/傣族题材常用。" },
    ],
    costumeStyles: [
      { name: "水袖广袖式", female: "齐胸襦裙 + 加长水袖", male: "交领大袖袍 + 束腰", accessories: ["点翠头饰", "流苏腰坠"], moods: ["古典", "汉唐", "水墨"] },
      { name: "民族盛装式", female: "对应民族纹样裙装(如傣族筒裙/蒙古族长袍)", male: "对应民族马甲长袍 + 腰带", accessories: ["银饰", "民族头巾/帽"], moods: ["民族", "节庆", "风情"] },
      { name: "轻纱写意式", female: "多层渐变轻纱裙,便于旋转", male: "飘逸开衫 + 阔腿裤", accessories: ["绸扇/绸带道具", "素色发带"], moods: ["写意", "山水", "月光"] },
    ],
    palettes: [
      { name: "黛山远水", primary: "黛绿", primaryHex: "#3D5C4F", secondary: "远山灰", secondaryHex: "#B9C0C9", accent: "泥金", accentHex: "#B08D57", family: ["绿", "灰", "青", "黛"], note: "水墨山水意象,冷光薄雾效果佳。" },
      { name: "石榴绯红", primary: "石榴红", primaryHex: "#D23B2E", secondary: "橘橙", secondaryHex: "#F08C2E", accent: "明黄", accentHex: "#FCD337", family: ["红", "橙", "黄"], note: "热烈民族风,篝火/丰收题材首选。" },
      { name: "孔雀翠蓝", primary: "孔雀蓝", primaryHex: "#147E8F", secondary: "翠绿", secondaryHex: "#2E8B57", accent: "银白", accentHex: "#E5E7EB", family: ["蓝", "绿", "翠"], note: "傣族孔雀舞经典配色,冷暖光皆宜。" },
      { name: "月华素白", primary: "素白", primaryHex: "#F8F8F4", secondary: "淡藕荷", secondaryHex: "#E4C6D0", accent: "浅金", accentHex: "#E3C88F", family: ["白", "紫", "藕"], note: "月光/仙鹤题材,逆光剪影极美。" },
    ],
  },
  {
    programTypes: ["ballet"],
    archetype: "芭蕾",
    formations: [
      { name: "对称双翼式", summary: "以中轴对称双翼展开,群舞衬独舞", rows: 2, spacingRule: "对称人距 1.2m,中轴留 3m 独舞区", countRange: [8, 24], tips: "经典群舞范式,注意足尖区地胶。" },
      { name: "斜线大跳通道式", summary: "群舞让出对角通道供大跳连接", rows: 2, spacingRule: "通道宽 2.5m,两侧人距 1m", countRange: [10, 20], tips: "技巧展示段落专用。" },
      { name: "四小天鹅横列式", summary: "紧凑单排手挽手小队", rows: 1, spacingRule: "肩距贴合,队宽按 4-8 人", countRange: [4, 8], tips: "整齐度要求极高,建议等高编队。" },
    ],
    costumeStyles: [
      { name: "经典 TUTU 式", female: "纱质 TUTU 裙 + 足尖鞋", male: "紧身上衣 + 弹力裤 + 软底鞋", accessories: ["头冠/发网", "肉色打底袜"], moods: ["经典", "天鹅湖", "比赛"] },
      { name: "浪漫长纱式", female: "及小腿浪漫纱裙(Romantic tutu)", male: "诗人衫 + 弹力裤", accessories: ["花环发饰", "缎带"], moods: ["浪漫", "仙女", "抒情"] },
    ],
    palettes: [
      { name: "天鹅白蓝", primary: "纯白", primaryHex: "#FFFFFF", secondary: "冰蓝", secondaryHex: "#A8D8EA", accent: "银", accentHex: "#C0C0C0", family: ["白", "蓝", "银"], note: "经典天鹅意象,冷色追光适配。" },
      { name: "黑天鹅金", primary: "曜黑", primaryHex: "#14141A", secondary: "暗金", secondaryHex: "#9A7B2D", accent: "绯红", accentHex: "#C41E3A", family: ["黑", "金", "红"], note: "戏剧张力强,适合黑天鹅变奏。" },
      { name: "樱粉浪漫", primary: "樱花粉", primaryHex: "#F7C9D4", secondary: "香槟", secondaryHex: "#E6CFA3", accent: "淡紫", accentHex: "#C6B5DD", family: ["粉", "紫", "香槟"], note: "低学段芭蕾启蒙常用,柔光适配。" },
    ],
  },
  {
    programTypes: ["modern_jazz_street"],
    archetype: "现代/爵士/街舞",
    formations: [
      { name: "金字塔爆点式", summary: "三角金字塔,副歌瞬间散开爆点", rows: 3, spacingRule: "塔尖 1 人,层距 1m,散开半径 3m", countRange: [7, 21], tips: "配合音乐重拍设计队形炸开。" },
      { name: "分组 Battle 式", summary: "左右两组对峙轮流输出", rows: 2, spacingRule: "组间 4m 对峙区,组内 80cm", countRange: [8, 20], tips: "街舞 battle 段落,注意轮换走位。" },
      { name: "波浪推进式", summary: "横排波浪律动逐排推进", rows: 3, spacingRule: "排间 1.2m,推进步幅 60cm", countRange: [12, 30], tips: "Waacking/wave 类动作串联好。" },
      { name: "散点重组式", summary: "自由散点起手,副歌收拢成图形", rows: 2, spacingRule: "散点最小间距 1m", countRange: [10, 28], tips: "现代舞常用,注意收拢路线不交叉。" },
    ],
    costumeStyles: [
      { name: "街头工装式", female: "oversize 卫衣 + 工装裤", male: "oversize T恤 + 束脚工装裤", accessories: ["棒球帽/渔夫帽", "腰包", "高帮板鞋"], moods: ["街舞", "hip-hop", "活力"] },
      { name: "爵士亮片式", female: "亮片短上衣 + 高腰阔腿裤", male: "缎面衬衫 + 直筒裤", accessories: ["亮片手套", "礼帽"], moods: ["爵士", "复古", "百老汇"] },
      { name: "现代极简式", female: "纯色宽松套装,便于地面动作", male: "��色系宽松套装", accessories: ["无配饰或单色发带"], moods: ["现代舞", "先锋", "情绪"] },
      { name: "荧光机能式", female: "荧光拼接紧身衣 + 反光条", male: "机能马甲 + 荧光束脚裤", accessories: ["荧光手环", "LED 鞋带(可选)"], moods: ["科幻", "电音", "夜光"] },
    ],
    palettes: [
      { name: "黑金街头", primary: "黑", primaryHex: "#111111", secondary: "金", secondaryHex: "#D4AF37", accent: "白", accentHex: "#FFFFFF", family: ["黑", "金", "白"], note: "街舞万能配色,频闪灯效果炸裂。" },
      { name: "荧光撞色", primary: "荧光绿", primaryHex: "#39FF14", secondary: "电光紫", secondaryHex: "#BF00FF", accent: "亮橙", accentHex: "#FF6D00", family: ["绿", "紫", "橙", "荧光"], note: "紫外灯/黑光灯下发光,炸场首选。" },
      { name: "牛仔蓝白", primary: "牛仔蓝", primaryHex: "#3E6B9B", secondary: "纯白", secondaryHex: "#FFFFFF", accent: "红", accentHex: "#D2222D", family: ["蓝", "白", "红", "牛仔"], note: "复古美式,青春运动感强。" },
    ],
  },
  {
    programTypes: ["western_orchestra", "folk_orchestra", "instrument"],
    archetype: "器乐/管弦乐",
    formations: [
      { name: "指挥扇形式", summary: "以指挥为心的扇形声部布局", rows: 3, spacingRule: "谱架间距 1.2m,声部弧线排列", countRange: [15, 60], tips: "弦乐前、管乐中、打击乐后为经典排布。" },
      { name: "民乐八字式", summary: "拉弦弹拨呈八字分列,吹打居后", rows: 3, spacingRule: "八字夹角约 120°,人距 1m", countRange: [12, 45], tips: "民族管弦乐团标准阵型。" },
      { name: "小合奏半圆式", summary: "单排或双排半圆面向观众", rows: 2, spacingRule: "半圆弦距 1m", countRange: [3, 14], tips: "重奏/小合奏适用,注意乐器灯位。" },
    ],
    costumeStyles: [
      { name: "交响正装式", female: "黑色长裙或黑色套装", male: "黑西装/燕尾服 + 白衬衫 + 领结", accessories: ["珍珠项链(可选)", "袖扣"], moods: ["交响", "古典", "正式"] },
      { name: "民乐国风式", female: "改良旗袍或襦裙(演奏袖口收窄)", male: "立领盘扣上衣 + 直筒裤", accessories: ["玉坠", "束发簪"], moods: ["民乐", "国风", "雅集"] },
      { name: "轻快室内乐式", female: "纯色连衣裙(同色不同款)", male: "衬衫 + 马甲(去外套)", accessories: ["同色系领结"], moods: ["室内乐", "轻快", "校园"] },
    ],
    palettes: [
      { name: "曜黑纯白", primary: "黑", primaryHex: "#111111", secondary: "白", secondaryHex: "#FFFFFF", accent: "银", accentHex: "#C0C0C0", family: ["黑", "白", "银"], note: "交响标准配色,永不出错。" },
      { name: "绛紫鎏金", primary: "绛紫", primaryHex: "#5C2A4D", secondary: "鎏金", secondaryHex: "#C89B40", accent: "米白", accentHex: "#F5F1E8", family: ["紫", "金", "绛"], note: "民乐盛典质感,暖光下华贵。" },
      { name: "黛蓝月白", primary: "黛蓝", primaryHex: "#33507A", secondary: "月白", secondaryHex: "#D6ECF0", accent: "浅金", accentHex: "#E3C88F", family: ["蓝", "白", "黛"], note: "文人雅集气质,适合丝竹小合奏。" },
    ],
  },
  {
    programTypes: ["etiquette_award"],
    archetype: "礼仪/颁奖",
    formations: [
      { name: "夹道礼宾式", summary: "双列夹道,引导动线清晰", rows: 2, spacingRule: "列距 2.5m 通道,人距 1m", countRange: [6, 20], tips: "托盘手统一高度与角度。" },
      { name: "颁奖梯台式", summary: "领奖台三级 + 礼仪两翼站位", rows: 2, spacingRule: "两翼距台 1.5m 对称", countRange: [4, 12], tips: "注意与摄影机位不遮挡。" },
    ],
    costumeStyles: [
      { name: "红色礼仪式", female: "红色立领旗袍 + 白手套", male: "深色西装 + 红领带 + 白手套", accessories: ["绶带", "托盘(道具)"], moods: ["颁奖", "庆典", "正式"] },
      { name: "香槟晚礼式", female: "香槟色鱼尾礼服", male: "黑西装 + 香槟领结", accessories: ["珍珠耳饰(夹式)", "口袋巾"], moods: ["晚会", "高雅", "年度盛典"] },
    ],
    palettes: [
      { name: "中国红金", primary: "中国红", primaryHex: "#C8102E", secondary: "金", secondaryHex: "#D4AF37", accent: "白", accentHex: "#FFFFFF", family: ["红", "金", "白"], note: "颁奖庆典标准配色,大屏红金呼应。" },
      { name: "香槟象牙", primary: "香槟金", primaryHex: "#E6CFA3", secondary: "象牙白", secondaryHex: "#F8F4E3", accent: "浅咖", accentHex: "#B49B7F", family: ["金", "白", "香槟"], note: "高雅低调,适合学术类颁奖。" },
    ],
  },
  {
    programTypes: ["acrobatics_martial_arts", "cheerleading", "sports_opening_ceremony"],
    archetype: "武术/啦啦操/开幕式",
    formations: [
      { name: "方阵冲击式", summary: "整齐方阵齐进齐停,气势压场", rows: 4, spacingRule: "横纵各 1.2m,踩点行进", countRange: [16, 64], tips: "武术操/入场式经典,重音踏步统一。" },
      { name: "金字塔叠层式", summary: "啦啦操托举金字塔造型", rows: 3, spacingRule: "底层人距 60cm,保护位四角", countRange: [12, 24], tips: "托举必须配保护员,先地面后空中。" },
      { name: "图形变换式", summary: "由方阵变换出字母/数字/图案", rows: 4, spacingRule: "网格 1m 点位,按编号走位", countRange: [24, 100], tips: "开幕式常用,发点位编号卡。" },
      { name: "双龙出水式", summary: "两列纵队交叉穿插行进", rows: 2, spacingRule: "纵队人距 1m,交叉口错拍通过", countRange: [12, 40], tips: "武术/舞龙题材入场调度。" },
    ],
    costumeStyles: [
      { name: "武术练功式", female: "红色练功服 + 束腰", male: "黑/红练功服 + 绑腿", accessories: ["彩带束腰", "布鞋"], moods: ["武术", "功夫", "少年强"] },
      { name: "啦啦操亮片式", female: "亮片背心裙 + 短裤打底", male: "运动背心 + 运动长裤", accessories: ["花球", "运动发带", "白色运动鞋"], moods: ["啦啦操", "活力", "竞技"] },
      { name: "开幕式方阵式", female: "统一色运动套装", male: "统一色运动套装", accessories: ["方阵旗", "白手套", "统一帽"], moods: ["开幕式", "入场", "团体"] },
    ],
    palettes: [
      { name: "炽焰红黑", primary: "炽红", primaryHex: "#D93025", secondary: "黑", secondaryHex: "#111111", accent: "金", accentHex: "#D4AF37", family: ["红", "黑", "金"], note: "武术力量感配色,鼓点灯光同步佳。" },
      { name: "活力蓝橙", primary: "宝蓝", primaryHex: "#2653C9", secondary: "亮橙", secondaryHex: "#FF8200", accent: "白", accentHex: "#FFFFFF", family: ["蓝", "橙", "白"], note: "啦啦操高对比撞色,白天户外醒目。" },
      { name: "青春绿白", primary: "草绿", primaryHex: "#6AA84F", secondary: "白", secondaryHex: "#FFFFFF", accent: "明黄", accentHex: "#FCD337", family: ["绿", "白", "黄"], note: "运动会开幕清新配色,草坪场地融合。" },
    ],
  },
  {
    programTypes: ["class_showcase", "new_year_gala", "holiday_festival", "reunion_gala", "non_competition_group_show"],
    archetype: "晚会/展演",
    formations: [
      { name: "分组轮转式", summary: "多小组轮流上前,其余组定格背景", rows: 3, spacingRule: "组间 2m,前区表演位留 4m", countRange: [15, 50], tips: "串烧节目通用,组间切换配灯光切区。" },
      { name: "半环谢幕式", summary: "全员半环面向观众,中央留主持位", rows: 2, spacingRule: "半环弦距 70cm", countRange: [10, 60], tips: "开场/谢幕通用,注意两端不出侧幕。" },
      { name: "星形绽放式", summary: "五角星形五臂展开,轮流亮臂", rows: 2, spacingRule: "臂间夹角 72°,臂内人距 80cm", countRange: [15, 40], tips: "新年晚会主视觉队形,俯拍出图。" },
    ],
    costumeStyles: [
      { name: "节庆喜乐式", female: "红色系连衣裙或唐装上衣", male: "唐装马甲 + 深色裤", accessories: ["中国结挂饰", "红围巾"], moods: ["新年", "节庆", "喜庆"] },
      { name: "班级统一式", female: "班服 + 统一下装", male: "班服 + 统一下装", accessories: ["班级徽章", "统一鞋色"], moods: ["班级展演", "低成本", "统一"] },
      { name: "多彩混搭式", female: "同款不同色系连衣裙(彩虹分布)", male: "同款不同色 polo/衬衫", accessories: ["同色系发带/领结"], moods: ["缤纷", "欢乐", "大合唱谢幕"] },
    ],
    palettes: [
      { name: "新春红金", primary: "正红", primaryHex: "#C8102E", secondary: "金", secondaryHex: "#D4AF37", accent: "中国白", accentHex: "#FBF6EF", family: ["红", "金", "白"], note: "新年晚会不二之选,灯笼大屏呼应。" },
      { name: "彩虹七色", primary: "红橙黄", primaryHex: "#E4572E", secondary: "绿蓝紫", secondaryHex: "#3A7BD5", accent: "白", accentHex: "#FFFFFF", family: ["彩虹", "多彩", "七彩"], note: "多班级联合展演,按班分色识别度高。" },
      { name: "暖橘奶白", primary: "暖橘", primaryHex: "#F2913D", secondary: "奶白", secondaryHex: "#FBF3E4", accent: "焦糖", accentHex: "#B5732B", family: ["橙", "白", "橘", "暖"], note: "秋季校园节/返校晚会温暖怀旧。" },
    ],
  },
];

/**
 * 通用队形池:跨节目类型可迁移的经典舞台队形。
 * 检索时与原型专属队形合并(同名去重、按人数过滤),让每种节目类型
 * 都能复用方阵/V 字/扇形等通用编排,而不局限于原型内置的几套。
 */
export const UNIVERSAL_FORMATIONS: FormationTemplate[] = [
  { name: "标准方阵式", summary: "等行等列方阵,横竖对齐斜线成行", rows: 4, spacingRule: "横竖间距均 80cm,四角定点校准", countRange: [9, 64], tips: "最百搭的队形,行进/静态皆宜;先定四角再填内部。", universal: true, tags: ["整齐", "气势", "行进", "团体"] },
  { name: "V字展开式", summary: "以中心点为尖向两翼斜向展开呈 V 形", rows: 3, spacingRule: "斜线人距 75cm,两翼夹角约 60°", countRange: [7, 35], tips: "尖点站核心成员;适合高潮段落向前推进。", universal: true, tags: ["聚焦", "推进", "高潮", "领舞"] },
  { name: "倒V雁阵式", summary: "开口朝观众的倒 V,如雁群展翅", rows: 3, spacingRule: "斜线人距 75cm,开口宽度约台宽 2/3", countRange: [7, 35], tips: "两翼末端留最灵活的成员,便于变队衔接。", universal: true, tags: ["舒展", "开场", "迎宾", "大气"] },
  { name: "扇形辐射式", summary: "以舞台前中为圆心呈扇面展开", rows: 3, spacingRule: "弧线弦距 65cm,层间半径差 1m", countRange: [10, 40], tips: "扇心可站领唱/领舞;收扇变横排是经典变队。", universal: true, tags: ["环抱", "柔和", "抒情", "聚拢"] },
  { name: "菱形对称式", summary: "单人尖点、中段最宽的菱形对称站位", rows: 5, spacingRule: "对角线间距 80cm,中轴严格对称", countRange: [8, 30], tips: "视觉焦点强,适合独舞+群舞层次;人数以奇数排布更对称。", universal: true, tags: ["对称", "焦点", "独领", "层次"] },
  { name: "同心圆环式", summary: "内外双圆环,可反向旋转流动", rows: 2, spacingRule: "内环半径 1.5m,外环半径 3m,环上等分", countRange: [10, 36], tips: "旋转变队观赏性强;注意圆心定位参照物。", universal: true, tags: ["流动", "旋转", "欢快", "民族"] },
  { name: "双排错落式(通用)", summary: "前后两排半肩错位,后排全部可见", rows: 2, spacingRule: "错位半肩位,排间 1m,左右 70cm", countRange: [6, 28], tips: "小体量节目的稳妥选择;前矮后高。", universal: true, tags: ["简洁", "小型", "稳妥"] },
  { name: "斜线破格式", summary: "一条贯穿舞台的对角斜线,打破横平竖直", rows: 1, spacingRule: "斜线人距 90cm,首尾各距台口/台侧 1m", countRange: [4, 16], tips: "适合叙事推进、依次亮相的段落。", universal: true, tags: ["叙事", "亮相", "先锋", "纵深"] },
  { name: "十字交叉式", summary: "横竖两列在台心交叉成十字", rows: 3, spacingRule: "臂间 70cm,交叉点留 1m 空位", countRange: [9, 25], tips: "从十字散开为方阵/圆形都很顺;交叉点是天然 C 位。", universal: true, tags: ["变队", "枢纽", "对称"] },
  { name: "金字塔层叠式", summary: "前少后多逐排递增,如金字塔剪影", rows: 4, spacingRule: "每排递增 2 人,排间 90cm,左右 65cm", countRange: [10, 40], tips: "配合台阶或高低道具效果更佳;顶点站核心。", universal: true, tags: ["气势", "递进", "压轴", "合影"] },
  // ===== 以下队形沉淀自 31 个真实演出视频的调研分析(StageOS 核心引擎 FORMATION_RULES)=====
  { name: "跪站混合三层式", summary: "前排跪坐 + 中后排站立的三层错落站位", rows: 3, spacingRule: "前排跪坐间距 50cm,中后排站立左右 60cm,排间 80cm", countRange: [12, 36], tips: "小学低段合唱高频队形;跪坐排放最矮的孩子,视觉层次自然拉开且无需台架。", universal: true, tags: ["低龄", "合唱", "层次", "童趣", "小学"] },
  { name: "前三后二蹲站式", summary: "前排三分之二蹲/跪 + 后排站立的两层紧凑站位", rows: 2, spacingRule: "前排间距 45cm,后排 60cm,排间 70cm", countRange: [8, 20], tips: "学前与低龄节目的稳妥选择;无队形变换,靠表情与轻微摇摆撑场。", universal: true, tags: ["学前", "低龄", "简洁", "稳妥"] },
  { name: "弧形领诵分区式", summary: "多排弧形合诵区 + 独立前置领诵位", rows: 3, spacingRule: "弧线弦距 60cm,排间 85cm,领诵位距首排 1.5m", countRange: [10, 40], tips: "朗诵类节目标准队形;领诵独立走位,合诵区统一朝向,男女左右分区更利声部平衡。", universal: true, tags: ["朗诵", "领诵", "弧形", "分区", "仪式"] },
  { name: "双色声部分组式", summary: "按声部/服色分成左右两组,阶梯排布", rows: 3, spacingRule: "组内左右 55cm,两组间留 1m 分界,逐排增高 20cm", countRange: [24, 60], tips: "高中及以上合唱高频队形;两组服装用撞色或深浅呼应,视觉与声部一举两得。", universal: true, tags: ["合唱", "声部", "撞色", "高中", "大型"] },
  { name: "梯形阶梯合唱式", summary: "上窄下宽的梯形轮廓,逐排增高站上台架", rows: 4, spacingRule: "左右 55cm,逐排增高 25cm,首末排宽度差约 1/4 台宽", countRange: [30, 80], tips: "中学以上大合唱标准队形;需合唱台架,末排注意护栏,指挥与队形中轴对齐。", universal: true, tags: ["合唱", "阶梯", "气势", "大型", "比赛"] },
  { name: "扇形声部排列式", summary: "以指挥为圆心扇面展开,按乐��/声部分区", rows: 3, spacingRule: "弧线弦距 70cm,层间半径差 1.2m,声部间留 80cm 分界", countRange: [12, 50], tips: "器乐与民乐合奏标准队形;高音区靠外、低音区靠内,谱架与人错位摆放。", universal: true, tags: ["器乐", "乐团", "扇形", "声部"] },
  { name: "景深三区戏剧式", summary: "前中后三个表演分区,按场景切换调度", rows: 3, spacingRule: "前区距台口 1m,区间纵深各约 1/3 台深,横��自由", countRange: [6, 30], tips: "课本剧/戏剧通用;主角色居前区,群演中后区候场式站位,配合灯光分区切换场景。", universal: true, tags: ["戏剧", "课本剧", "分区", "叙事", "调度"] },
  { name: "环形领唱环绕式", summary: "群体围成开口环形,领唱/独唱居环心", rows: 2, spacingRule: "环上等分 65cm,环心留 2m 表演区,开口朝观众", countRange: [12, 40], tips: "有领唱/独唱段落的高中合唱与民族节目常用;环体可缓慢流动增强仪式感。", universal: true, tags: ["领唱", "环形", "民族", "仪式", "流动"] },
];

/** 中文色名 → HEX 对照表(由知识库全部配色条目汇总生成,另补常用色)。 */
export const COLOR_NAME_HEX: Record<string, string> = (() => {
  const map: Record<string, string> = {
    // 常用补充色(可能出现在用户自由输入的 screenThemeColor 中)
    红: "#C8102E", 红色: "#C8102E", 大红: "#C8102E",
    蓝: "#2653C9", 蓝色: "#2653C9", 天蓝: "#87CEEB", 深蓝: "#1F3C88",
    绿: "#2E8B57", 绿色: "#2E8B57", 墨绿: "#3D5C4F",
    黄: "#FCD337", 黄色: "#FCD337", 金黄: "#D4AF37",
    紫: "#4B2E83", 紫色: "#4B2E83",
    粉: "#F7C9D4", 粉色: "#F7C9D4", 粉红: "#F4A7B9",
    橙: "#FF8200", 橙色: "#FF8200",
    白: "#FFFFFF", 白色: "#FFFFFF",
    黑: "#111111", 黑色: "#111111",
    灰: "#9CA3AF", 灰色: "#9CA3AF",
    金: "#D4AF37", 金色: "#D4AF37",
    银: "#C0C0C0", 银色: "#C0C0C0",
  };
  // 853 个中国传统色(palette-library):让用户输入「石榴红」「黛蓝」等传统色名也能解析。
  // 先注入,后续知识库配色条目可覆盖同名(保持原型配色优先)。
  for (const c of PALETTE_COLORS) {
    if (c.name_zh && c.hex) map[c.name_zh] = c.hex.toUpperCase();
  }
  for (const k of STAGE_KNOWLEDGE) {
    for (const p of k.palettes) {
      map[p.primary] = p.primaryHex;
      map[p.secondary] = p.secondaryHex;
      map[p.accent] = p.accentHex;
    }
  }
  return map;
})();

/**
 * 将自由文本颜色(HEX / 中文色名)解析为可渲染的 HEX。
 * - "#1E3A8A" / "1E3A8A" 直接返回规范化 HEX。
 * - "靛蓝" 等中文色名查 COLOR_NAME_HEX(支持文本中包含色名,取最长命中)。
 * - 解析失败返回 null,调用方自行兜底。
 */
export function resolveColorHex(input: string | undefined | null): string | null {
  if (!input) return null;
  const text = input.trim();
  const hexMatch = text.match(/#?([0-9a-fA-F]{6})(?![0-9a-fA-F])/);
  if (hexMatch) return `#${hexMatch[1].toUpperCase()}`;
  let best: string | null = null;
  let bestLen = 0;
  for (const [name, hex] of Object.entries(COLOR_NAME_HEX)) {
    if (name.length > bestLen && text.includes(name)) {
      best = hex;
      bestLen = name.length;
    }
  }
  return best;
}

/** 检索结果 */
export type KnowledgeRetrieval = {
  archetype: string;
  /** 按人数过滤后的队形推荐(不匹配人数时回退全部) */
  formations: FormationTemplate[];
  costumeStyles: CostumeStyle[];
  /** 按主题色匹配排序后的配色方案 */
  palettes: ColorPalette[];
  /** 命中说明,用于 UI/日志展示检索依据 */
  matchedBy: string[];
};

type RetrievalInput = {
  programType?: string;
  performerCount?: number;
  screenThemeColor?: string;
  programTheme?: string;
};

/**
 * 从内置知识库检索节目类型对应的队形/款式/配色。
 * - programType 精确命中原型;未命中回退「晚会/展演」原型。
 * - performerCount 过滤队形人数区间。
 * - screenThemeColor / programTheme 关键词对配色与款式做相关性排序。
 */
export function retrieveStageKnowledge(input: RetrievalInput): KnowledgeRetrieval {
  const matchedBy: string[] = [];
  let profile = STAGE_KNOWLEDGE.find((k) => input.programType && k.programTypes.includes(input.programType));
  if (profile) {
    matchedBy.push(`节目类型命中原型「${profile.archetype}」`);
  } else {
    profile = STAGE_KNOWLEDGE[STAGE_KNOWLEDGE.length - 1];
    matchedBy.push(`节目类型未命中,回退原型「${profile.archetype}」`);
  }

  // 队形 = 原型专属 + 通用队形池(同名去重),再按人数过滤、按主题相关性排序。
  const seenNames = new Set(profile.formations.map((f) => f.name));
  const merged: FormationTemplate[] = [
    ...profile.formations,
    ...UNIVERSAL_FORMATIONS.filter((f) => !seenNames.has(f.name)),
  ];

  let formations = merged;
  if (typeof input.performerCount === "number" && input.performerCount > 0) {
    const fit = merged.filter(
      (f) => input.performerCount! >= f.countRange[0] && input.performerCount! <= f.countRange[1],
    );
    if (fit.length > 0) {
      formations = fit;
      matchedBy.push(`人数 ${input.performerCount} 过滤出 ${fit.length} 套适配队形(含通用队形池)`);
    } else {
      matchedBy.push(`人数 ${input.performerCount} 无精确区间命中,返回全部队形供参考`);
    }
  } else {
    matchedBy.push(`合并通用队形池后共 ${merged.length} 套队形可选`);
  }

  // 主题相关性排序:命中 tags 的靠前;同分时原型专属优先于通用。
  const formationThemeText = input.programTheme ?? "";
  const scoreFormation = (f: FormationTemplate) =>
    (f.tags ?? []).reduce((n, t) => (formationThemeText.includes(t) ? n + 1 : n), 0);
  formations = [...formations].sort((a, b) => {
    const diff = scoreFormation(b) - scoreFormation(a);
    if (diff !== 0) return diff;
    return (a.universal ? 1 : 0) - (b.universal ? 1 : 0);
  });
  if (formationThemeText.trim() && scoreFormation(formations[0]) > 0) {
    matchedBy.push(`节目主题匹配到队形「${formations[0].name}」优先`);
  }

  const colorText = `${input.screenThemeColor ?? ""} ${input.programTheme ?? ""}`;
  const scorePalette = (p: ColorPalette) => p.family.reduce((s, f) => (colorText.includes(f) ? s + 1 : s), 0);
  const palettes = [...profile.palettes].sort((a, b) => scorePalette(b) - scorePalette(a));
  if (colorText.trim() && scorePalette(palettes[0]) > 0) {
    matchedBy.push(`主题色/主题匹配到配色「${palettes[0].name}」优先`);
  }

  const themeText = input.programTheme ?? "";
  const scoreStyle = (s: CostumeStyle) => s.moods.reduce((n, m) => (themeText.includes(m) ? n + 1 : n), 0);
  const costumeStyles = [...profile.costumeStyles].sort((a, b) => scoreStyle(b) - scoreStyle(a));
  if (themeText.trim() && scoreStyle(costumeStyles[0]) > 0) {
    matchedBy.push(`节目主题匹配到款式「${costumeStyles[0].name}」优先`);
  }

  return { archetype: profile.archetype, formations, costumeStyles, palettes, matchedBy };
}

/**
 * 将检索结果编译为可注入 AI prompt 的中文知识上下文。
 */
export function compileKnowledgeContext(r: KnowledgeRetrieval): string {
  const lines: string[] = [];
  lines.push(`【知识库检索结果 · 原型:${r.archetype}】`);
  lines.push(`检索依据: ${r.matchedBy.join("; ")}`);
  lines.push("");
  lines.push("◆ 推荐队形模板(按适配度排序;标注[通用]的为跨节目类型可迁移队形):");
  r.formations.forEach((f, i) => {
    const tag = f.universal ? "[通用]" : `[${r.archetype}专属]`;
    lines.push(`${i + 1}. ${tag}${f.name} — ${f.summary};行数 ${f.rows};间距 ${f.spacingRule};适用 ${f.countRange[0]}-${f.countRange[1]} 人;要点:${f.tips}`);
  });
  lines.push("");
  lines.push("◆ 可选服装款式方向(按主题相��度排序):");
  r.costumeStyles.forEach((s, i) => {
    lines.push(`${i + 1}. ${s.name} — 女:${s.female};男:${s.male};配饰:${s.accessories.join("、")};适配氛围:${s.moods.join("/")}`);
  });
  lines.push("");
  lines.push("◆ 可选配色方案(按主题色相关度排序,HEX 为精确色值):");
  r.palettes.forEach((p, i) => {
    lines.push(`${i + 1}. ${p.name} — 主色 ${p.primary}(${p.primaryHex}) / 辅色 ${p.secondary}(${p.secondaryHex}) / 点缀 ${p.accent}(${p.accentHex});${p.note}`);
  });
  lines.push("");
  lines.push("要求:请基于以上知识库条目进行组合与本地化调整(结合学段、预算、人数、主题色),优先选用排序靠前的条目;服装方案必须体现所选款式与配色方案名称,颜色描述必须使用知识库给出的中文色名并附精确 HEX 色值(如「朱红 #C3272B」),不得自行发明或替换色值;涉及站位/走位/队形建议时,必须引用上述队形模板名称(含[通用]池)并沿用其行数与间距规则,可组合多个模板描述变队路线(如「标准方阵式→扇形辐射式」),不得凭空发明与知识库冲突的方案。");
  return lines.join("\n");
}
