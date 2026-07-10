// StageOS 反向约束规则数据(自动生成自 stage_constraint.py v1.2,勿手改)。
// 65 条规则:25 条硬禁止(hard_block) + 28 条软约束(soft_warn) + 12 条提示(info_note)。
// 基于 31 个真实演出视频 + 7 张专业海报的跨学段分析沉淀。
// 学段/主题/节目/舞台条件使用源引擎枚举 value(pre/el/em/mid/high/adult 等),
// 与项目字段的映射在 stage-constraints.ts 中完成。

export const STAGE_CONSTRAINT_RULES = [
  {
    "rule_id": "AGE_PRE_BLOCK_COMPLEX_MOTION",
    "level": "hard_block",
    "scope": "motion",
    "condition_grade": [
      "pre"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "双臂展开",
      "编舞动作",
      "队形变换",
      "跳跃",
      "旋转",
      "走位调度",
      "大幅度肢体动作",
      "手势舞"
    ],
    "reason": "学前儿童肢体协调能力有限，复杂动作会导致表演混乱",
    "alternative": "纯站立或跪坐，靠面部表情和简单摇摆体现童趣"
  },
  {
    "rule_id": "AGE_PRE_BLOCK_DARK_COSTUME",
    "level": "hard_block",
    "scope": "costume",
    "condition_grade": [
      "pre"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "deep_black",
      "dark_navy",
      "dark_brown",
      "deep_charcoal",
      "纯黑礼服",
      "深灰西装",
      "暗紫色系"
    ],
    "reason": "学前儿童体型小，深色系服装会压住舞台，视觉上不突出",
    "alternative": "使用高明度亮色系：明黄、浅粉、天蓝、薄荷绿"
  },
  {
    "rule_id": "AGE_PRE_BLOCK_DARK_THEME",
    "level": "hard_block",
    "scope": "all",
    "condition_grade": [
      "pre"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "gothic",
      "horror",
      "dark_skull",
      "暗黑哥特",
      "恐怖元素",
      "骷髅",
      "血红色"
    ],
    "reason": "学前儿童心理承受能力有限，暗黑恐怖元素可能造成恐惧",
    "alternative": "选择温馨童趣、自然动物、节日欢乐等正向主题"
  },
  {
    "rule_id": "AGE_EL_BLOCK_COMPLEX_GESTURE",
    "level": "hard_block",
    "scope": "motion",
    "condition_grade": [
      "el"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "双臂展开",
      "手势舞",
      "编舞动作",
      "旋转跳跃",
      "队形变换中跑动",
      "交叉走位",
      "复杂手部动作"
    ],
    "reason": "1-3年级肢体协调仍在发展，复杂手势易造成表演不整齐",
    "alternative": "纯站立/跪坐演唱，靠眼神和面部表情传达情感"
  },
  {
    "rule_id": "AGE_EL_BLOCK_DEEP_COSTUME",
    "level": "soft_warn",
    "scope": "costume",
    "condition_grade": [
      "el"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "deep_black",
      "dark_brown",
      "charcoal_gray",
      "深咖啡色",
      "暗紫色"
    ],
    "reason": "低段学生体型小，深色服装容易在舞台上'消失'",
    "alternative": "优先浅粉、明黄、浅蓝等高明度色彩"
  },
  {
    "rule_id": "AGE_EL_BLOCK_DARK_GOTHIC",
    "level": "hard_block",
    "scope": "all",
    "condition_grade": [
      "el"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "gothic",
      "horror",
      "dark_skull",
      "暗黑哥特",
      "恐怖道具",
      "血腥元素"
    ],
    "reason": "6-9岁儿童不适合暗黑恐怖风格，容易造成心理不适",
    "alternative": "选择童趣/自然/古诗/节日等积极正向主题"
  },
  {
    "rule_id": "AGE_EM_WARN_COMPLEX_MOTION",
    "level": "soft_warn",
    "scope": "motion",
    "condition_grade": [
      "em"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "编舞动作",
      "大幅度跳跃",
      "快速队形变换",
      "旋转360度",
      "地板动作"
    ],
    "reason": "3-5年级学生有一定协调力但仍有限，复杂动作易导致不整齐",
    "alternative": "可有简单上肢律动，身体微倾，以站姿为主"
  },
  {
    "rule_id": "AGE_EM_WARN_TOO_CHILDISH",
    "level": "info_note",
    "scope": "all",
    "condition_grade": [
      "em"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "过度卡通化道具",
      "夸张玩偶头套",
      "幼儿园风格装饰"
    ],
    "reason": "3-5年级学生开始有'成熟感'意识，过于幼稚会降低参与热情",
    "alternative": "可在童趣基础上融入国风/田园等稍有深度的元素"
  },
  {
    "rule_id": "AGE_MID_WARN_CHILDISH",
    "level": "soft_warn",
    "scope": "all",
    "condition_grade": [
      "mid"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "卡通玩偶服",
      "幼儿园风格头饰",
      "夸张卡通背景",
      "低幼化色彩"
    ],
    "reason": "初中生进入青春期，过于幼稚的风格会引发排斥心理",
    "alternative": "选择仪式感、现代感、国风等有格调的风格"
  },
  {
    "rule_id": "AGE_MID_WARN_OVER_MOTION",
    "level": "soft_warn",
    "scope": "motion",
    "condition_grade": [
      "mid"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "大幅编舞",
      "激烈跳跃",
      "快速走位跑动"
    ],
    "reason": "初中生可做轻微上肢动作，但大幅度动作仍会破坏合唱整齐度",
    "alternative": "站姿挺拔，统一朝向，轻微上肢配合即可"
  },
  {
    "rule_id": "AGE_HIGH_BLOCK_DANCE_IN_CHOIR",
    "level": "soft_warn",
    "scope": "motion",
    "condition_grade": [
      "high"
    ],
    "condition_theme": null,
    "condition_program": [
      "choir"
    ],
    "condition_stage": null,
    "blocked_items": [
      "编舞动作",
      "舞蹈化走位",
      "大幅旋转",
      "地板动作"
    ],
    "reason": "高中合唱应保持专业感，过度舞蹈化会分散对声音的注意力",
    "alternative": "双臂展开、手掌抬起等肢体表达即可，核心仍是声音"
  },
  {
    "rule_id": "AGE_HIGH_ADULT_INFO_MATURE",
    "level": "info_note",
    "scope": "all",
    "condition_grade": [
      "high",
      "adult"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [],
    "reason": "高中及以上可驾驭成熟复杂风格：撞色分组、环形队形、渐变礼服等",
    "alternative": null
  },
  {
    "rule_id": "AGE_PRE_BLOCK_COMPLEX_FORMATION",
    "level": "hard_block",
    "scope": "formation",
    "condition_grade": [
      "pre"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "环形构图",
      "多组交错队形",
      "4排以上阶梯",
      "复杂走位调度",
      "多区域分区"
    ],
    "reason": "学前儿童空间感知能力有限，无法完成复杂队形变换",
    "alternative": "简单2排站位，前排蹲+后排站即可"
  },
  {
    "rule_id": "AGE_EL_BLOCK_COMPLEX_FORMATION",
    "level": "soft_warn",
    "scope": "formation",
    "condition_grade": [
      "el"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "环形构图",
      "4排以上阶梯",
      "多组交错队形",
      "多区域分区调度"
    ],
    "reason": "低段学生排队能力有限，3排跪+站混合已足够",
    "alternative": "跪+站混合三层，前排跪坐+中后排站立"
  },
  {
    "rule_id": "PROG_INST_BLOCK_LARGE_MOTION",
    "level": "hard_block",
    "scope": "motion",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": [
      "instrumental"
    ],
    "condition_stage": null,
    "blocked_items": [
      "编舞动作",
      "大幅度肢体动作",
      "跳跃",
      "走位跑动",
      "旋转",
      "队形变换"
    ],
    "reason": "器乐演奏需要双手操作乐器，大幅动作会影响演奏",
    "alternative": "以演奏姿态为主，可配合轻微身体律动"
  },
  {
    "rule_id": "AGE_PRE_BLOCK_SMALL_FRAGILE_PROP",
    "level": "hard_block",
    "scope": "props",
    "condition_grade": [
      "pre"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "细小零件道具",
      "玻璃材质道具",
      "尖锐道具",
      "易碎物品",
      "带电池小道具"
    ],
    "reason": "学前儿童安全意识弱，细小/尖锐/易碎道具存在安全隐患",
    "alternative": "使用柔软、大体积、无尖锐边角的安全道具"
  },
  {
    "rule_id": "AGE_YOUNG_BLOCK_REVEAL_COSTUME",
    "level": "hard_block",
    "scope": "costume",
    "condition_grade": [
      "pre",
      "el",
      "em"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "露背设计",
      "露肩设计",
      "深V领",
      "高叉裙",
      "超短迷你裙",
      "透视面料"
    ],
    "reason": "未成年学生服装需符合年龄特征，不宜过于暴露",
    "alternative": "选择保守款式的圆领/V领/立领设计"
  },
  {
    "rule_id": "AGE_EM_WARN_DARK_STAGE",
    "level": "soft_warn",
    "scope": "bg",
    "condition_grade": [
      "em"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "纯黑背景",
      "全暗舞台",
      "暗调剧场"
    ],
    "reason": "中段学生需要明亮舞台来突出表演效果，纯暗背景会压住学生",
    "alternative": "使用渐变背景或带国风元素的背景"
  },
  {
    "rule_id": "AGE_ADULT_WARN_SIMPLE_FORMATION",
    "level": "info_note",
    "scope": "formation",
    "condition_grade": [
      "adult"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "单排站位",
      "2排简单排列"
    ],
    "reason": "成人合唱团视觉表达应更丰富，过于简单的队形显得单调",
    "alternative": "建议双色分组+弧形排列，至少3-4排阶梯"
  },
  {
    "rule_id": "AGE_YOUNG_BLOCK_HEAVY_FABRIC",
    "level": "soft_warn",
    "scope": "costume",
    "condition_grade": [
      "pre",
      "el"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "厚重呢绒面料",
      "皮草材质",
      "多层叠加厚重礼服"
    ],
    "reason": "低龄儿童体温调节能力弱，厚重面料影响活动和舒适度",
    "alternative": "选择棉质、薄纱等轻盈透气面料"
  },
  {
    "rule_id": "STAGE_INDOOR_BLOCK_LARGE_SPACE_FX",
    "level": "hard_block",
    "scope": "bg",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": [
      "indoor"
    ],
    "blocked_items": [
      "航拍俯瞰",
      "沙漠苍茫",
      "大海辽阔",
      "草原无际",
      "大型实景布景"
    ],
    "reason": "室内剧场空间有限，大空间视觉效果无法呈现，反而显得局促",
    "alternative": "使用投影/LED屏呈现远景，配合聚光灯聚焦表演者"
  },
  {
    "rule_id": "STAGE_OUTDOOR_BLOCK_PRECISE_FX",
    "level": "hard_block",
    "scope": "bg",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": [
      "outdoor"
    ],
    "blocked_items": [
      "移轴微缩",
      "精密几何投影",
      "需要暗场的光影"
    ],
    "reason": "室外环境光线复杂，无法实现需要精确控制的视觉效果",
    "alternative": "利用自然景观+喷绘背景板，自然光漫射"
  },
  {
    "rule_id": "STAGE_OUTDOOR_BLOCK_DARK_FX",
    "level": "soft_warn",
    "scope": "bg",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": [
      "outdoor"
    ],
    "blocked_items": [
      "星空浩瀚暗场",
      "纯黑背景+聚光灯",
      "暗调剧场效果",
      "需要完全遮光"
    ],
    "reason": "室外无法实现完全暗场效果，环境光会冲淡暗场氛围",
    "alternative": "选择傍晚/夜间演出，或改用暖色渐变背景"
  },
  {
    "rule_id": "STAGE_INDOOR_BLOCK_NATURAL_LIGHT_FX",
    "level": "soft_warn",
    "scope": "bg",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": [
      "indoor"
    ],
    "blocked_items": [
      "阳光普照效果",
      "晨曦微光",
      "自然光漫射场景"
    ],
    "reason": "室内剧场依赖人工灯光，自然光效果需靠灯光模拟，成本较高",
    "alternative": "用暖黄聚光灯模拟自然光效果"
  },
  {
    "rule_id": "STAGE_OUTDOOR_WARN_ACOUSTIC",
    "level": "info_note",
    "scope": "all",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": [
      "choir",
      "instrumental"
    ],
    "condition_stage": [
      "outdoor"
    ],
    "blocked_items": [
      "无伴奏合唱",
      "纯器乐独奏"
    ],
    "reason": "室外环境噪音大，无伴奏/纯器乐效果会受环境影响",
    "alternative": "建议配备扩音设备，或选择有遮蔽的半室外场地"
  },
  {
    "rule_id": "STAGE_INDOOR_BLOCK_FIRE_PROP",
    "level": "hard_block",
    "scope": "props",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": [
      "indoor"
    ],
    "blocked_items": [
      "明火蜡烛",
      "烟火特效",
      "火盆道具"
    ],
    "reason": "室内场地消防安全要求严格，禁止明火",
    "alternative": "使用LED仿真蜡烛/电子烟火特效"
  },
  {
    "rule_id": "STAGE_OUTDOOR_WARN_SMALL_PROP",
    "level": "soft_warn",
    "scope": "props",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": [
      "outdoor"
    ],
    "blocked_items": [
      "小型手工艺品",
      "精密折纸道具",
      "细小装饰品"
    ],
    "reason": "室外空间大，小道具在远距离观看时几乎不可见",
    "alternative": "选择大体积、高辨识度的道具"
  },
  {
    "rule_id": "STAGE_INDOOR_INFO_WIND_FX",
    "level": "info_note",
    "scope": "bg",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": [
      "indoor"
    ],
    "blocked_items": [
      "真实花瓣飘落",
      "真实雪花飘落"
    ],
    "reason": "室内可使用人工飘落效果，但需注意清洁和安全",
    "alternative": "使用仿真花瓣/雪花纸片飘落装置"
  },
  {
    "rule_id": "STAGE_OUTDOOR_BLOCK_LIGHT_SHOW",
    "level": "hard_block",
    "scope": "bg",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": [
      "outdoor"
    ],
    "blocked_items": [
      "激光灯阵列",
      "精密灯光编程秀",
      "全息投影"
    ],
    "reason": "室外环境光无法支持精密灯光效果，白天完全不可见",
    "alternative": "使用喷绘背景板+彩旗+自然装饰"
  },
  {
    "rule_id": "STAGE_OUTDOOR_WARN_DELICATE_COSTUME",
    "level": "info_note",
    "scope": "costume",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": [
      "outdoor"
    ],
    "blocked_items": [
      "重磅丝绒长裙",
      "精致缎面礼服"
    ],
    "reason": "室外环境可能遇到风沙/雨水，精致面料易受损",
    "alternative": "选择耐脏、易打理的棉质或混纺面料"
  },
  {
    "rule_id": "PROG_CHOIR_BLOCK_DANCE_MOTION",
    "level": "hard_block",
    "scope": "motion",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": [
      "choir"
    ],
    "condition_stage": null,
    "blocked_items": [
      "编舞动作",
      "街舞动作",
      "大幅跳跃",
      "地板动作",
      "快速跑动",
      "舞蹈化走位变换"
    ],
    "reason": "合唱的核心是声音表现，过度动作会影响气息控制和音准",
    "alternative": "站姿为主，可有轻微身体律动和手势配合"
  },
  {
    "rule_id": "PROG_CHOIR_WARN_FACE_BLOCK_PROP",
    "level": "soft_warn",
    "scope": "props",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": [
      "choir"
    ],
    "condition_stage": null,
    "blocked_items": [
      "面具",
      "大面积头饰遮挡",
      "口罩式道具"
    ],
    "reason": "合唱需要展现面部表情和口型，遮挡面部会影响表演效果",
    "alternative": "道具应持于手中或置于身侧，不遮挡面部"
  },
  {
    "rule_id": "PROG_RECIT_WARN_INTENSE_MOTION",
    "level": "soft_warn",
    "scope": "motion",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": [
      "recitation"
    ],
    "condition_stage": null,
    "blocked_items": [
      "激烈肢体冲突",
      "大幅跑动",
      "跳跃动作",
      "夸张面部扭曲"
    ],
    "reason": "朗诵以语言表达为核心，过于激烈的肢体动作会分散注意力",
    "alternative": "站姿挺拔，配合语言节奏的手势即可"
  },
  {
    "rule_id": "PROG_RECIT_WARN_COMPLEX_FORMATION",
    "level": "info_note",
    "scope": "formation",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": [
      "recitation"
    ],
    "condition_stage": null,
    "blocked_items": [
      "频繁队形变换",
      "舞蹈化走位"
    ],
    "reason": "朗诵需要稳定站位保证声音投射，频繁变换会打断语言节奏",
    "alternative": "固定队形+领诵者前移即可"
  },
  {
    "rule_id": "PROG_TRAD_BLOCK_MODERN_PROP",
    "level": "hard_block",
    "scope": "props",
    "condition_grade": null,
    "condition_theme": [
      "trad"
    ],
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "LED道具",
      "发光手环",
      "现代话筒道具",
      "电子屏幕",
      "disco_ball"
    ],
    "reason": "传统戏曲/昆曲需保持古典美学一致性，现代道具会破坏风格",
    "alternative": "使用水袖、折扇、团扇、书简等传统道具"
  },
  {
    "rule_id": "THEME_TRAD_BLOCK_MODERN_COSTUME",
    "level": "hard_block",
    "scope": "costume",
    "condition_grade": null,
    "condition_theme": [
      "trad"
    ],
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "运动装",
      "牛仔装",
      "朋克风格",
      "现代舞衣",
      "暴露设计"
    ],
    "reason": "戏曲主题需要传统服饰元素保持一致性",
    "alternative": "使用中式立领、交领、盘扣等传统元素服装"
  },
  {
    "rule_id": "PROG_INST_BLOCK_PERFORMANCE_MOTION",
    "level": "hard_block",
    "scope": "motion",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": [
      "instrumental"
    ],
    "condition_stage": null,
    "blocked_items": [
      "需要双手离开的动作",
      "大幅度转身",
      "跳跃",
      "需要移动走位"
    ],
    "reason": "器乐演奏需要双手操作乐器，任何影响演奏的动作都不允许",
    "alternative": "以演奏姿态为主，可配合轻微身体律动"
  },
  {
    "rule_id": "PROG_DRAMA_WARN_ALL_STATIC",
    "level": "soft_warn",
    "scope": "motion",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": [
      "drama"
    ],
    "condition_stage": null,
    "blocked_items": [
      "全程站立不动",
      "无走位无互动"
    ],
    "reason": "戏剧需要角色走位和互动来推动剧情，全程静态会失去戏剧张力",
    "alternative": "设计角色走位调度和互动动作"
  },
  {
    "rule_id": "PROG_CHOIR_POETRY_BLOCK_ELECTRONIC",
    "level": "soft_warn",
    "scope": "props",
    "condition_grade": null,
    "condition_theme": [
      "poetry"
    ],
    "condition_program": [
      "choir"
    ],
    "condition_stage": null,
    "blocked_items": [
      "LED手环",
      "电子荧光棒",
      "蓝牙音箱道具"
    ],
    "reason": "古诗合唱需要古典意境，电子道具破坏氛围",
    "alternative": "使用折扇、书简、油纸伞等传统道具"
  },
  {
    "rule_id": "PROG_DANCE_BLOCK_ALL_STATIC",
    "level": "hard_block",
    "scope": "motion",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": [
      "dance"
    ],
    "condition_stage": null,
    "blocked_items": [
      "全程站立不动",
      "无动作",
      "仅嘴型表演"
    ],
    "reason": "舞蹈的核心是肢体动作，全程静态则不是舞蹈",
    "alternative": "根据学段设计适当幅度的编舞动作"
  },
  {
    "rule_id": "THEME_CHILD_BLOCK_SCARY_PROP",
    "level": "hard_block",
    "scope": "props",
    "condition_grade": null,
    "condition_theme": [
      "child"
    ],
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "仿真骷髅",
      "恐怖面具",
      "血腥道具",
      "蜘蛛蛇蝎仿真"
    ],
    "reason": "童趣主题应传递快乐温暖，恐怖道具与主题冲突",
    "alternative": "使用卡通化、Q版的动物/植物道具"
  },
  {
    "rule_id": "THEME_CEREMONY_BLOCK_FRIVOLOUS",
    "level": "hard_block",
    "scope": "props",
    "condition_grade": null,
    "condition_theme": [
      "ceremony"
    ],
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "搞笑道具",
      "恶搞装饰",
      "气球动物搞笑造型"
    ],
    "reason": "仪式/主旋律节目需要庄重感，搞笑道具会破坏严肃性",
    "alternative": "使用国旗、花束、横幅等正式道具"
  },
  {
    "rule_id": "THEME_ETHNIC_WARN_NO_ELEMENT",
    "level": "soft_warn",
    "scope": "costume",
    "condition_grade": null,
    "condition_theme": [
      "ethnic"
    ],
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "纯西式礼服",
      "无任何民族元素的现代装"
    ],
    "reason": "民族主题需要体现民族文化特色，纯西式服装缺乏一致性",
    "alternative": "至少加入民族纹样、银饰、刺绣等元素"
  },
  {
    "rule_id": "THEME_INTL_WARN_SINGLE_ETHNIC",
    "level": "info_note",
    "scope": "all",
    "condition_grade": null,
    "condition_theme": [
      "intl"
    ],
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "单一民族服饰",
      "单一国家旗帜"
    ],
    "reason": "国际主题应体现多元文化，过于单一不符合'国际'定位",
    "alternative": "融合多国元素或使用通用学院风/世界音乐风格"
  },
  {
    "rule_id": "THEME_FOLK_WARN_OVER_ELABORATE",
    "level": "info_note",
    "scope": "costume",
    "condition_grade": null,
    "condition_theme": [
      "folk"
    ],
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "过度华丽宫廷礼服",
      "闪片满饰"
    ],
    "reason": "民谣主题追求自然质朴，过于华丽的服装与民谣气质不符",
    "alternative": "选择简洁质朴的棉质/亚麻服装"
  },
  {
    "rule_id": "XCOLOR_BLOCK_GOTHIC_SWEET_PINK",
    "level": "hard_block",
    "scope": "color",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "gothic+sweet_pink",
      "暗黑+甜粉撞色"
    ],
    "reason": "暗黑哥特和甜粉在情感表达上完全对立，混用会产生严重视觉割裂",
    "alternative": "哥特配深红/暗紫，甜粉配浅蓝/明黄"
  },
  {
    "rule_id": "XCOSTUME_BG_BLOCK_SAME_COLOR",
    "level": "hard_block",
    "scope": "color",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "white_costume+white_bg",
      "black_costume+black_bg",
      "同色服装配同色背景"
    ],
    "reason": "服装与背景同色会导致表演者'消失'在背景中",
    "alternative": "确保服装与背景有足够明度差（至少2级明度对比）"
  },
  {
    "rule_id": "XSTYLE_PROP_BLOCK_MINIMAL_DISCO",
    "level": "hard_block",
    "scope": "props",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "minimalist+disco_ball",
      "极简主义+彩灯球",
      "极简+华丽装饰"
    ],
    "reason": "极简主义追求简洁克制，disco_ball等华丽道具完全矛盾",
    "alternative": "极简风格配合线条道具/光影效果"
  },
  {
    "rule_id": "XTHEME_COLOR_WARN_POETRY_SATURATED",
    "level": "soft_warn",
    "scope": "color",
    "condition_grade": null,
    "condition_theme": [
      "poetry"
    ],
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "neon_colors",
      "荧光色",
      "高饱和撞色",
      "亮橙+亮绿",
      "荧光粉+荧光黄"
    ],
    "reason": "古诗/国风追求古典雅致，高饱和撞色会破坏古典意境",
    "alternative": "使用低饱和传统色：水墨灰、青绿、藕粉、月白"
  },
  {
    "rule_id": "XTHEME_COLOR_BLOCK_CHILD_DARK",
    "level": "hard_block",
    "scope": "color",
    "condition_grade": null,
    "condition_theme": [
      "child"
    ],
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "纯黑主色调",
      "暗灰色调",
      "深棕主色调",
      "暗黑配色"
    ],
    "reason": "童趣主题应明快活泼，暗色系与童趣完全不符",
    "alternative": "使用明黄、浅粉、天蓝、薄荷绿等高明度色彩"
  },
  {
    "rule_id": "XCOSTUME_PROP_BLOCK_STYLE_CLASH",
    "level": "soft_warn",
    "scope": "props",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "中式旗袍+荧光棒",
      "古典礼服+电子屏幕",
      "民族服饰+塑料玩具"
    ],
    "reason": "服装与道具风格需保持一致性，混搭会产生严重视觉违和感",
    "alternative": "中式服装配传统道具，现代服装配现代道具"
  },
  {
    "rule_id": "XBG_LIGHT_WARN_LIGHT_ON_LIGHT",
    "level": "soft_warn",
    "scope": "bg",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "浅色背景+强白光",
      "白色幕布+冷白强光"
    ],
    "reason": "浅色背景加强光会导致画面过曝，表演者细节丢失",
    "alternative": "浅色背景配柔和暖光，深色背景才配强聚光"
  },
  {
    "rule_id": "XTHEME_COLOR_BLOCK_CEREMONY_NEON",
    "level": "hard_block",
    "scope": "color",
    "condition_grade": null,
    "condition_theme": [
      "ceremony"
    ],
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "荧光色主调",
      "彩虹色渐变",
      "迪斯科灯光"
    ],
    "reason": "仪式/主旋律主题需要庄重严肃，荧光色过于轻浮",
    "alternative": "使用红金配色、白+深色系"
  },
  {
    "rule_id": "XAGE_COLOR_WARN_ADULT_CHILDISH",
    "level": "soft_warn",
    "scope": "color",
    "condition_grade": [
      "adult"
    ],
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "彩虹条纹",
      "全卡通印花",
      "幼儿园风格配色"
    ],
    "reason": "成人合唱团使用过于低龄的配色会降低专业感",
    "alternative": "使用深红、藏蓝、墨绿等沉稳色彩"
  },
  {
    "rule_id": "XTHEME_BG_WARN_POETRY_GEOMETRY",
    "level": "soft_warn",
    "scope": "bg",
    "condition_grade": null,
    "condition_theme": [
      "poetry"
    ],
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "现代几何背景",
      "赛博朋克风格",
      "科技感LED背景"
    ],
    "reason": "古诗主题需要古典意境，现代几何/赛博朋克风格破坏氛围",
    "alternative": "使用水墨渐变、云纹、山水等古典背景"
  },
  {
    "rule_id": "XPROP_STAGE_BLOCK_LARGE_INDOOR",
    "level": "soft_warn",
    "scope": "props",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": [
      "indoor"
    ],
    "blocked_items": [
      "大型充气道具",
      "3米以上布景",
      "需要多人搬运的道具"
    ],
    "reason": "室内剧场空间有限，大型道具会挤占表演空间",
    "alternative": "使用可折叠/小型化的道具方案"
  },
  {
    "rule_id": "XCOSTUME_SEASON_WARN_FABRIC",
    "level": "info_note",
    "scope": "costume",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "夏季厚重丝绒",
      "冬季轻薄薄纱"
    ],
    "reason": "服装面料需与季节温度匹配，影响表演者舒适度",
    "alternative": "夏季选棉麻/薄纱，冬季选丝绒/加厚面料"
  },
  {
    "rule_id": "XAGE_COLOR_BLOCK_EL_COMPLEX_GROUP",
    "level": "soft_warn",
    "scope": "color",
    "condition_grade": [
      "pre",
      "el"
    ],
    "condition_theme": null,
    "condition_program": [
      "choir"
    ],
    "condition_stage": null,
    "blocked_items": [
      "三色以上声部分组",
      "复杂撞色分区"
    ],
    "reason": "低龄合唱团用过多色彩分区会增加排练难度，视觉上也会显得杂乱",
    "alternative": "用2色即可（如女孩浅色+男孩深色）"
  },
  {
    "rule_id": "XFORM_PROG_WARN_SCATTER_CHOIR",
    "level": "soft_warn",
    "scope": "formation",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": [
      "choir"
    ],
    "condition_stage": null,
    "blocked_items": [
      "完全散点分布",
      "无序站位"
    ],
    "reason": "合唱需要声部集中以便指挥和听觉融合，散点会导致声音分散",
    "alternative": "使用阶梯式排列或弧形队列"
  },
  {
    "rule_id": "XALL_WARN_LOW_CONTRAST",
    "level": "soft_warn",
    "scope": "all",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "低对比度整体方案"
    ],
    "reason": "服装、背景、灯光三者明度过于接近时，表演者会'融入'背景",
    "alternative": "确保三者之间至少有一级明度差异"
  },
  {
    "rule_id": "SEASON_WINTER_BLOCK_LONG_DAYLIGHT",
    "level": "soft_warn",
    "scope": "bg",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": [
      "outdoor"
    ],
    "blocked_items": [
      "需要长时间自然光",
      "依赖日出日落的灯光"
    ],
    "reason": "冬季白天短，室外自然光可用时间有限",
    "alternative": "选择人工灯光方案，或利用下午黄金时段演出"
  },
  {
    "rule_id": "SEASON_SUMMER_BLOCK_WINTER_THEME",
    "level": "soft_warn",
    "scope": "all",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "雪山圣境",
      "冰雪奇缘风格",
      "冬季雪景背景"
    ],
    "reason": "夏季演出使用冰雪冬季主题与季节氛围严重不符",
    "alternative": "夏季选择清凉但不冬季的主题，如海洋/森林/星空"
  },
  {
    "rule_id": "SEASON_WINTER_BLOCK_SUMMER_THEME",
    "level": "soft_warn",
    "scope": "all",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [
      "热带沙滩",
      "夏日派对风格",
      "烈日炎炎背景"
    ],
    "reason": "冬季演出使用盛夏主题与季节氛围不符",
    "alternative": "冬季选择温暖但不盛夏的主题，如火炉/节日/新年"
  },
  {
    "rule_id": "SEASON_AUTUMN_INFO_GOLDEN",
    "level": "info_note",
    "scope": "color",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [],
    "reason": "秋季演出建议使用暖金色调（橙黄/棕红/琥珀色），与季节呼应",
    "alternative": null
  },
  {
    "rule_id": "SEASON_SPRING_INFO_FRESH",
    "level": "info_note",
    "scope": "color",
    "condition_grade": null,
    "condition_theme": null,
    "condition_program": null,
    "condition_stage": null,
    "blocked_items": [],
    "reason": "春季演出建议使用清新色调（嫩绿/浅粉/天蓝），与季节呼应",
    "alternative": null
  }
];
