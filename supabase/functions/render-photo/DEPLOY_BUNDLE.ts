// supabase/functions/render-photo/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// supabase/functions/_shared/palette-data.ts
var PALETTE_DATA = {
  "version": "v1.4",
  "stats": {
    "total_colors": 853,
    "total_formulas": 7,
    "total_presets": 70
  },
  "disclaimer": "\u56E0\u663E\u793A\u5668\u8272\u5F69\u8FD8\u539F\u80FD\u529B\u4E0D\u540C\uFF0C\u672C\u914D\u8272\u53C2\u8003\u53EF\u80FD\u4EA7\u751F\u8272\u5DEE\u3002\u5B9E\u9645\u6253\u6837/\u5370\u5237/\u67D3\u5E03/\u670D\u88C5/\u821E\u53F0\u706F\u5149\u7B49\u5E94\u7528\u65F6\uFF0C\u8BF7\u4EE5\u8272\u5361\u6216\u5B9E\u7269\u7269\u6599\u4E3A\u51C6\u3002",
  "colors": [
    {
      "name_zh": "\u80ED\u8102",
      "hex": "#9D2933",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6731\u7802",
      "hex": "#FF461F",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u706B\u7EA2",
      "hex": "#FF2D2D",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E2D\u56FD\u7EA2",
      "hex": "#AA2116",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u831C\u8272",
      "hex": "#CB3A56",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7EDB\u7D2B",
      "hex": "#8C4356",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6BB7\u7EA2",
      "hex": "#BE002F",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67A3\u7EA2",
      "hex": "#C32136",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5AE3\u7EA2",
      "hex": "#EF7A82",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D0B\u7EA2",
      "hex": "#FF0097",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5983\u8272",
      "hex": "#ED5736",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u54C1\u7EA2",
      "hex": "#F00056",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6843\u7EA2",
      "hex": "#F47983",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D77\u68E0\u7EA2",
      "hex": "#DB5A6B",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u77F3\u69B4\u7EA2",
      "hex": "#F20C00",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6A31\u6843\u7EA2",
      "hex": "#C93756",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94F6\u7EA2",
      "hex": "#F05654",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5927\u7EA2",
      "hex": "#FF2121",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7EEF\u7EA2",
      "hex": "#C83C23",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9161\u7EA2",
      "hex": "#DC3023",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5F64\u8272",
      "hex": "#F35336",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8D64",
      "hex": "#C3272B",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E39\u7802",
      "hex": "#FF4C00",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8D6D\u7EA2",
      "hex": "#A75D52",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6731\u8198",
      "hex": "#F36838",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6A58\u8272",
      "hex": "#FA8C35",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6A59\u76AE",
      "hex": "#FF7500",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8D6D\u77F3",
      "hex": "#B5495B",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u73AB\u7470\u7EA2",
      "hex": "#D13A77",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D0B\u8471\u7D2B",
      "hex": "#A8456B",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D77\u68E0",
      "hex": "#EEA2A4",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7C89\u7EA2",
      "hex": "#FFB3A7",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6843\u82B1",
      "hex": "#F2CACA",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6DE1\u7EEF",
      "hex": "#F2E1DF",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6DE1\u7C89",
      "hex": "#FBE8E8",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6768\u5983",
      "hex": "#F5D3D3",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9161\u989C",
      "hex": "#F9906F",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9189\u989C",
      "hex": "#EA517F",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E39\u8272",
      "hex": "#FF4E20",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u971C\u7EA2",
      "hex": "#ED5A65",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u843D\u971E",
      "hex": "#CB5C83",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5F69\u4E91",
      "hex": "#D24735",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8D64\u971E",
      "hex": "#EF5B25",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u80ED\u8102\u866B",
      "hex": "#CC163A",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9152\u7EA2",
      "hex": "#8E2323",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u91D1\u6A58",
      "hex": "#F28500",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u8346\u7EA2",
      "hex": "#C35691",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u8587\u7EA2",
      "hex": "#DE7897",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u675C\u9E43\u7EA2",
      "hex": "#ED2939",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7261\u4E39\u7EA2",
      "hex": "#E63995",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6843\u7C89",
      "hex": "#FFB7C5",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6A31\u82B1\u7C89",
      "hex": "#FFB7DD",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u73AB\u7470\u7D2B",
      "hex": "#BA2F7B",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u674F\u7EA2",
      "hex": "#FF8C31",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67FF\u7EA2",
      "hex": "#FF7256",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6A59\u7EA2",
      "hex": "#FF6100",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u843D\u7EA2",
      "hex": "#C73E1D",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u69B4\u7EA2",
      "hex": "#B22B2B",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8C46\u853B",
      "hex": "#EBB6B2",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u7EA2",
      "hex": "#C81E2A",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94C1\u9508\u7EA2",
      "hex": "#A73829",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8C47\u8C46\u7EA2",
      "hex": "#FF6F61",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8C46\u6C99",
      "hex": "#874B43",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67A3\u9A9D",
      "hex": "#7C1F0F",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9F99\u775B",
      "hex": "#A12927",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9E47",
      "hex": "#E60026",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u66D9\u7EA2",
      "hex": "#FF0040",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8D64\u4E39",
      "hex": "#C8321B",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u71C3\u7EA2",
      "hex": "#E12C2C",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8089\u7EA2",
      "hex": "#EED4D1",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u80ED\u8102\u7C89",
      "hex": "#F19C9A",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7C89\u5986",
      "hex": "#F2D5D2",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7389\u7C89",
      "hex": "#F5E1E0",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94F6\u6731",
      "hex": "#BF302A",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8D64\u91D1",
      "hex": "#F2BE45",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6A58\u9EC4",
      "hex": "#FF8936",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u674F\u9EC4",
      "hex": "#FFA400",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u59DC\u9EC4",
      "hex": "#FFC773",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7F03\u8272",
      "hex": "#F0C239",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u96C4\u9EC4",
      "hex": "#E9BB1D",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67F3\u9EC4",
      "hex": "#C9DD22",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8471\u9EC4",
      "hex": "#A3D900",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7425\u73C0",
      "hex": "#CA6924",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u674F\u7EA2",
      "hex": "#FFA631",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7425\u73C0\u9EC4",
      "hex": "#CA8622",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u91D1\u8272",
      "hex": "#EACD76",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9E45\u9EC4",
      "hex": "#FFF143",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u660E\u9EC4",
      "hex": "#F2CE2B",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u85E4\u9EC4",
      "hex": "#FFB61E",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u571F\u9EC4",
      "hex": "#D6A01D",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u96CC\u9EC4",
      "hex": "#FFC64B",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67AF\u9EC4",
      "hex": "#D3B17D",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7259\u9EC4",
      "hex": "#EEDEB0",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u674F\u4EC1",
      "hex": "#FFE6C9",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8702\u871C",
      "hex": "#EB9605",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6787\u6777\u9EC4",
      "hex": "#FCA104",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6800\u5B50",
      "hex": "#FFC90E",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67E0\u6AAC\u9EC4",
      "hex": "#FFF44F",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6842\u76AE",
      "hex": "#C89B40",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u79CB\u8475\u9EC4",
      "hex": "#EED045",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8721\u9EC4",
      "hex": "#E9DDB6",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8C61\u7259",
      "hex": "#FFFBF0",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5AE9\u9EC4",
      "hex": "#F0DC70",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9EA6\u79C6",
      "hex": "#E2D849",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8336\u767D",
      "hex": "#F3F9F1",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67D8\u9EC4",
      "hex": "#E3A869",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u871C\u5408",
      "hex": "#F8BC31",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9EC4\u6817",
      "hex": "#E2C17C",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67AF\u53F6",
      "hex": "#B78D12",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E4C\u91D1",
      "hex": "#A78E44",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u80E1\u6843",
      "hex": "#A58F86",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u674F\u4EC1\u9EC4",
      "hex": "#F7E8AA",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u83CA\u857E",
      "hex": "#EFCC4B",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67F3\u82BD",
      "hex": "#D0E79E",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u87F9\u58F3\u9752",
      "hex": "#BBCDC5",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9E2D\u5375\u9752",
      "hex": "#E0EEE8",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u767D",
      "hex": "#C0EBD7",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8001\u94F6",
      "hex": "#BACAC6",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9E2D\u86CB\u9752",
      "hex": "#D4F2E7",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u86CB\u9752",
      "hex": "#C6E2FF",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7F03",
      "hex": "#F2ECDE",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7389\u8272",
      "hex": "#2EDFA3",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5929\u7AF9",
      "hex": "#E45A3C",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9171\u9EC4",
      "hex": "#B58A30",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u83DC\u5B50",
      "hex": "#E9D14F",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82A5\u672B",
      "hex": "#D4A300",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67DA\u9EC4",
      "hex": "#F7D155",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6A59\u67DA",
      "hex": "#FFA836",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67FF\u9EC4",
      "hex": "#F1C232",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u677E\u82B1\u9EC4",
      "hex": "#FFDB4B",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u677E\u67CF",
      "hex": "#21A675",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7FE0\u7AF9",
      "hex": "#66C18C",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u77FE",
      "hex": "#2C9678",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u6885",
      "hex": "#7BAA5A",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82BD\u7EFF",
      "hex": "#96CE54",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7389\u7C2A",
      "hex": "#E4FFE6",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9E66\u9E49\u7EFF",
      "hex": "#22C32E",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5B54\u96C0\u7EFF",
      "hex": "#229453",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94DC\u7EFF",
      "hex": "#549688",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u77F3\u7EFF",
      "hex": "#16A951",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7389\u9AD3",
      "hex": "#C4D7D6",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E95\u5929",
      "hex": "#6A9695",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u7FE0",
      "hex": "#00E500",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8D6D\u8272",
      "hex": "#9C5333",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8336\u8272",
      "hex": "#B35C44",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9A7C\u8272",
      "hex": "#A88462",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u78A7",
      "hex": "#48C0A3",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7FE0\u7EFF",
      "hex": "#00E079",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u78A7\u7EFF",
      "hex": "#2ADD9C",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u77F3\u9752",
      "hex": "#7BCFA6",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7F25\u8272",
      "hex": "#7FECAD",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u827E\u7EFF",
      "hex": "#A4E2C6",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u677E\u82B1\u7EFF",
      "hex": "#BCE672",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67F3\u7EFF",
      "hex": "#AFDD22",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8471\u7EFF",
      "hex": "#9ED900",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8C46\u7EFF",
      "hex": "#9ED048",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8349\u7EFF",
      "hex": "#40DE5A",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u8471",
      "hex": "#0AA344",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6CB9\u7EFF",
      "hex": "#00BC12",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u58A8\u7EFF",
      "hex": "#0C8918",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7AF9\u9752",
      "hex": "#789262",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7AF9\u7EFF",
      "hex": "#1BA784",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82D4\u85D3",
      "hex": "#697723",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u78A7\u87BA",
      "hex": "#5DBB63",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7FE0\u5FAE",
      "hex": "#93D5DC",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u677E\u70DF",
      "hex": "#4F5555",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6C99\u7EFF",
      "hex": "#9ECCAB",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5AE9\u7EFF",
      "hex": "#BDDD22",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67F3\u53F6",
      "hex": "#B7D07A",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8471\u9752",
      "hex": "#0EB83A",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82CD\u7FE0",
      "hex": "#519A73",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9EDB\u7EFF",
      "hex": "#426666",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82CD\u9EC4",
      "hex": "#A29B7C",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6A44\u6984",
      "hex": "#5E5314",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9E26\u9752",
      "hex": "#424C50",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82CD\u7EFF",
      "hex": "#223E36",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7FE1\u7FE0",
      "hex": "#3DE1AD",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u74F7",
      "hex": "#73B9A2",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u78A7\u6CE2",
      "hex": "#51C4D3",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5929\u6C34\u78A7",
      "hex": "#8ABCD1",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u677E\u9488",
      "hex": "#5E7C54",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82CD\u677E",
      "hex": "#4D6E53",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u767D\u7EFF",
      "hex": "#E0EEDD",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9EA6\u9752",
      "hex": "#7BA98A",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6625\u7EFF",
      "hex": "#7FB069",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u83CA\u7EFF",
      "hex": "#82AE32",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82F9\u7EFF",
      "hex": "#A6CF8A",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u828B",
      "hex": "#5B7C68",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82CE\u9EBB",
      "hex": "#768C55",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82D7\u8272",
      "hex": "#70B252",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D77\u677E",
      "hex": "#26745A",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5343\u5C81\u7EFF",
      "hex": "#296A45",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82D4\u8272",
      "hex": "#5A6443",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u714E\u8336",
      "hex": "#474232",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5343\u8349",
      "hex": "#92780A",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6C88\u9999\u7EFF",
      "hex": "#5C5C3F",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u78A7\u6D77",
      "hex": "#1AAB8A",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67CF\u6797",
      "hex": "#456A53",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u82D4",
      "hex": "#6B7C3F",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D77\u53C2",
      "hex": "#4D6650",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u767D\u840C",
      "hex": "#C8DAC5",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7389\u866B",
      "hex": "#5C6242",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u677E\u53F6",
      "hex": "#47595E",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6DF1\u677E",
      "hex": "#2D4F3F",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u7EFF",
      "hex": "#00CC99",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8584\u8377",
      "hex": "#83D9C1",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5170\u7EFF",
      "hex": "#7BC4A4",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9EA6\u7EFF",
      "hex": "#7BBA66",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u677E\u82B1\u7EFF",
      "hex": "#7AC74F",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6DE1\u7EFF",
      "hex": "#BFE2D5",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8584\u8377\u7EFF",
      "hex": "#7BC8A2",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7FE0\u7EFF",
      "hex": "#00AE6E",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82B1\u7EFF",
      "hex": "#7AB87A",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82D4\u7EFF",
      "hex": "#677E4A",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u53F6\u7EFF",
      "hex": "#5AAB68",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u74F7\u84DD",
      "hex": "#1781B5",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u91C9\u84DD",
      "hex": "#1177B0",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u96FE\u84DD",
      "hex": "#2E59A7",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u661F\u84DD",
      "hex": "#93B5CF",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7FBD\u6247",
      "hex": "#C3D7DF",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E91\u6C34\u84DD",
      "hex": "#BACCD9",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6674\u5C71\u84DD",
      "hex": "#8FB2C9",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u975B\u9752",
      "hex": "#177CB0",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D45\u84DD",
      "hex": "#D9E4F5",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6DE1\u84DD",
      "hex": "#D5E4EB",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6708\u767D",
      "hex": "#D6ECF0",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D77\u5929\u84DD",
      "hex": "#C4E1FF",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u77F3\u84DD",
      "hex": "#1685A9",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u78A7\u843D",
      "hex": "#8CBED6",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6E56\u6C34\u84DD",
      "hex": "#B0D5DF",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D77\u9752",
      "hex": "#22A2C3",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u666F\u6CF0\u84DD",
      "hex": "#2775B6",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u96FE\u9752",
      "hex": "#63BBD0",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u78A7\u7A7A",
      "hex": "#66BAB7",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u51A5",
      "hex": "#2E317C",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5929\u9752",
      "hex": "#68B88E",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u971C\u84DD",
      "hex": "#B8D4E3",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u96FE\u84DD",
      "hex": "#CDDCE4",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5B9D\u77F3\u84DD",
      "hex": "#2F90B9",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6674\u7A7A",
      "hex": "#7EB8DA",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u78A7\u84DD",
      "hex": "#3EEDE7",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u851A\u84DD",
      "hex": "#70F3FF",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6E56\u84DD",
      "hex": "#30DFF3",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u84DD\u9752",
      "hex": "#2068A2",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6E56\u7EFF",
      "hex": "#25F8CB",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u78A7",
      "hex": "#44CEF6",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6708\u5F71",
      "hex": "#C0C4C3",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u661F\u7070",
      "hex": "#B5B5B5",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6731\u989C",
      "hex": "#E16723",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6731\u971E",
      "hex": "#F04B22",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6A58\u4E39",
      "hex": "#F0945D",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82CD\u7BC1",
      "hex": "#A3D5C3",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u767D\u9752",
      "hex": "#A0D7C5",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6C34\u8272",
      "hex": "#88ADA6",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6C34\u7EA2",
      "hex": "#F3D3E7",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u7070",
      "hex": "#7D7D7D",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u867E\u58F3\u9752",
      "hex": "#9DC4B5",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7AF9\u6708",
      "hex": "#769A99",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u77F3\u9752\u7EFF",
      "hex": "#5A8B89",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5929\u6C34",
      "hex": "#75B9AA",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82CD\u9752",
      "hex": "#5C7C8A",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u9EDB",
      "hex": "#4B5CC4",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u971C\u9752",
      "hex": "#A8C4C2",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D6A\u82B1",
      "hex": "#C8DCD6",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u8584",
      "hex": "#92B2AD",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u77F3\u9752",
      "hex": "#0F95A0",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E91\u5C71",
      "hex": "#7BAFA9",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D77\u9752",
      "hex": "#1A6E84",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6DF1\u6E56\u84DD",
      "hex": "#1E5F7A",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E91\u677E",
      "hex": "#7AB0B5",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94F6\u6CB3",
      "hex": "#B7D5DD",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6C34\u6676",
      "hex": "#C0E0E5",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E91\u9752",
      "hex": "#A2C2C5",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u767D\u971C",
      "hex": "#E2E8E9",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u971C\u9752",
      "hex": "#C2D7D6",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6C34\u84DD",
      "hex": "#B4D2DB",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7FA4\u9752",
      "hex": "#4C8DAE",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82B1\u9752",
      "hex": "#003472",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7EC0\u9752",
      "hex": "#003371",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u85CF\u9752",
      "hex": "#3B2E7E",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u85CF\u84DD",
      "hex": "#2B4490",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u975B\u84DD",
      "hex": "#065279",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u54C1\u84DD",
      "hex": "#2F4F4F",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u85E4\u7D2B",
      "hex": "#8B2671",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u9171",
      "hex": "#815476",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9171\u7D2B",
      "hex": "#815463",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u6A80",
      "hex": "#4C221B",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u68E0",
      "hex": "#56004F",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u83B2",
      "hex": "#801DAE",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u96EA\u9752",
      "hex": "#B0A4E3",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E01\u9999",
      "hex": "#CCA4E3",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u85D5\u8272",
      "hex": "#EDD1D8",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u85D5\u8377",
      "hex": "#E4C6D0",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u85D5\u7D2B",
      "hex": "#8C7298",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u83C0",
      "hex": "#9B95C9",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u82D1",
      "hex": "#A361D8",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u73AB\u7D2B",
      "hex": "#4B0082",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u84DD\u7070",
      "hex": "#A1AFC9",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9EDB\u84DD",
      "hex": "#425066",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5929\u84DD",
      "hex": "#D3E0F3",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94B4\u84DD",
      "hex": "#0047AB",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6E5B\u84DD",
      "hex": "#1772B4",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7EC0\u84DD",
      "hex": "#2F3F60",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u666E\u84DD",
      "hex": "#003153",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u8272",
      "hex": "#8D4BBB",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u85E4\u841D\u7D2B",
      "hex": "#B28FCE",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6728\u69FF\u7D2B",
      "hex": "#A4778B",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u85E4",
      "hex": "#8076A3",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u8346",
      "hex": "#894E85",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u8587",
      "hex": "#DEB3E0",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u82CF",
      "hex": "#9B1E64",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9EDB\u7D2B",
      "hex": "#574266",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9F99\u8475\u7D2B",
      "hex": "#725E82",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6697\u7D2B",
      "hex": "#5D3F6A",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E4C\u7D2B",
      "hex": "#5C4F55",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8461\u8404\u6D46",
      "hex": "#4C1F24",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u828B\u7D2B",
      "hex": "#8B668B",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u69FF\u7D2B",
      "hex": "#806D9E",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8461\u8404",
      "hex": "#472D56",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8304\u76AE\u7D2B",
      "hex": "#22202E",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u9ED1",
      "hex": "#1E0936",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u975B\u84DD",
      "hex": "#1F3A93",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D77\u84DD",
      "hex": "#1B5EAD",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6DF1\u84DD",
      "hex": "#0C2F8A",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5929\u84DD",
      "hex": "#2271B3",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5B54\u96C0\u84DD",
      "hex": "#1B6CA8",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u84DD",
      "hex": "#0F6FB6",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u84DD\u8C03",
      "hex": "#5A8AC9",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D77\u84DD",
      "hex": "#3A6EAD",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6E56\u84DD",
      "hex": "#1F8FA8",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67D4\u84DD",
      "hex": "#6E96C0",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u66AE\u84DD",
      "hex": "#1F3275",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5E7D\u84DD",
      "hex": "#2C2E8A",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6DF1\u7D2B",
      "hex": "#3B0F6B",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u7D2B",
      "hex": "#6F2DA8",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u84DD\u7D2B",
      "hex": "#6244C2",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u7F57\u5170",
      "hex": "#A684C2",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u7070",
      "hex": "#7A89AB",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5929\u9752",
      "hex": "#3B5998",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5B54\u96C0",
      "hex": "#0D7E89",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94A2\u84DD",
      "hex": "#4682B4",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7070\u7D2B",
      "hex": "#7D6B8E",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6708\u7D2B",
      "hex": "#815A9A",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u68D5\u8336",
      "hex": "#B7511D",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u68D5\u8910",
      "hex": "#B25D25",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8D6D\u8272",
      "hex": "#B36D41",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8D6D\u77F3",
      "hex": "#845A33",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u68D5\u9EC4",
      "hex": "#AE7000",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u68D5\u7EA2",
      "hex": "#9B4400",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u68D5\u9ED1",
      "hex": "#7C4B00",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6606\u4ED1",
      "hex": "#FEFDEB",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u68D5\u6988",
      "hex": "#5B4913",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6930\u58F3",
      "hex": "#9B8878",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5496\u8272",
      "hex": "#A6522C",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6817\u8910",
      "hex": "#5D3131",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7EDB\u8910",
      "hex": "#6C3461",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6817\u8272",
      "hex": "#60281E",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u79CB\u8272",
      "hex": "#896C39",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8910\u8272",
      "hex": "#6E511E",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u68E0\u68A8",
      "hex": "#FAA755",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5496\u5561",
      "hex": "#4D3C2D",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6A80\u8272",
      "hex": "#B36D61",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7384\u8272",
      "hex": "#622A1D",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9A7C\u7ED2",
      "hex": "#C8A27C",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6C99\u68D5",
      "hex": "#C9A27C",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6C89\u9999",
      "hex": "#9D8B70",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E4C\u6728",
      "hex": "#392F31",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7F02",
      "hex": "#A98175",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6817\u5B50",
      "hex": "#8E3A1B",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8336\u6817",
      "hex": "#7C503B",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u80E1\u6843",
      "hex": "#614031",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u67FF\u6F06",
      "hex": "#7A2F1B",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9171\u8272",
      "hex": "#5A2D1E",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9171\u7EA2",
      "hex": "#5A1F1B",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8C46\u9171",
      "hex": "#4F2D1A",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8336\u8910",
      "hex": "#5C3317",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u69DF\u6994",
      "hex": "#FFB369",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u843D\u6817",
      "hex": "#993E29",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6867\u76AE",
      "hex": "#85431B",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u56E2\u5341\u90CE\u7EA2",
      "hex": "#DA6A47",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8D64\u94DC",
      "hex": "#B95E3E",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5C0F\u8C46",
      "hex": "#95412E",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7EA2\u6866",
      "hex": "#B65A38",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u84B8\u6817",
      "hex": "#C8B07E",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5A9A\u8776",
      "hex": "#E2B65C",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u767D\u6866",
      "hex": "#D5B895",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9EC4\u8336",
      "hex": "#C7A95C",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8431\u8349",
      "hex": "#E8B350",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9EC4\u4E39",
      "hex": "#EE7B1A",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u674F\u8272",
      "hex": "#E7A356",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u7EA2",
      "hex": "#D4237A",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u54C1\u7EA2",
      "hex": "#E94A8B",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D77\u68E0\u7EA2",
      "hex": "#F03752",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7C89\u7EA2",
      "hex": "#F19AAA",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u7C89",
      "hex": "#D6A8C9",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u7EA2",
      "hex": "#B4519A",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u7F57\u5170",
      "hex": "#A569BD",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6885\u7EA2",
      "hex": "#B5417A",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u73AB\u7470",
      "hex": "#C25B89",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7261\u4E39",
      "hex": "#D05596",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6708\u5B63",
      "hex": "#BA4B8B",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u85E4",
      "hex": "#A65D9B",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u51E4\u4ED9",
      "hex": "#C25A8C",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82CB\u7EA2",
      "hex": "#B83A5C",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u8346",
      "hex": "#B83A6E",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94C5\u767D",
      "hex": "#F0F0F4",
      "hue_group": "\u767D",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u96EA\u8272",
      "hex": "#FFFAFA",
      "hue_group": "\u7EA2",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u87F9\u9752",
      "hex": "#869D9D",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6697\u7070",
      "hex": "#4B4B4B",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7164\u9ED1",
      "hex": "#312520",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D20",
      "hex": "#E0F0E9",
      "hue_group": "\u7EFF",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82CD\u70DF",
      "hex": "#9DA4A5",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u58A8\u8272",
      "hex": "#50616D",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E4C\u9ED1",
      "hex": "#392F41",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6F06\u9ED1",
      "hex": "#161823",
      "hue_group": "\u9ED1",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94C5\u7070",
      "hex": "#7F7F7F",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94F6\u7070",
      "hex": "#B4B4B4",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7384\u9752",
      "hex": "#3D3B4F",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u7070",
      "hex": "#8A8D8F",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94C1\u7070",
      "hex": "#5B5B5B",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u70DF\u7070",
      "hex": "#7C7B7A",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E91\u7070",
      "hex": "#B7B8B6",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u58A8\u7070",
      "hex": "#3B3B3B",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7384\u9ED1",
      "hex": "#1C1C1C",
      "hue_group": "\u9ED1",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9EDB",
      "hex": "#4A4266",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82CD\u8272",
      "hex": "#75878A",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u971C\u8272",
      "hex": "#E9F1F6",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u82B1\u767D",
      "hex": "#C2CCD0",
      "hue_group": "\u9752",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9C7C\u809A\u767D",
      "hex": "#FCEFE8",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8C61\u7259\u767D",
      "hex": "#FFFEF9",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u4E73\u767D",
      "hex": "#F9F4DC",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7C73\u767D",
      "hex": "#F8F4ED",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94F6\u767D",
      "hex": "#E9E7EF",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7070\u767D",
      "hex": "#E8E8E8",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9ED1",
      "hex": "#000000",
      "hue_group": "\u9ED1",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u58A8\u9ED1",
      "hex": "#1A1A1A",
      "hue_group": "\u9ED1",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u767D",
      "hex": "#FFFFFF",
      "hue_group": "\u767D",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u971C\u84DD",
      "hex": "#D5E2EB",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9E45\u7070",
      "hex": "#D8D8C8",
      "hue_group": "\u9EC4",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9E64\u8272",
      "hex": "#C7C6C0",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u94F6\u9F20",
      "hex": "#91989F",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u96C0",
      "hex": "#7E8B97",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u85E4\u9F20",
      "hex": "#9E8C93",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u8336\u9F20",
      "hex": "#A3988B",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7070\u6885",
      "hex": "#E8D0BB",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u767D\u7FA4",
      "hex": "#BBCDD7",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u84DD\u9F20",
      "hex": "#70859D",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7A7A\u4E94",
      "hex": "#A3A2A0",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u949D\u8272",
      "hex": "#9F9F8E",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6854\u6897\u7D2B",
      "hex": "#7B6CB7",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u83DC\u5934\u7D2B",
      "hex": "#6B6882",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u85E4\u8272",
      "hex": "#A8B4CC",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u5229\u4F11\u9F20",
      "hex": "#707D74",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D20\u9F20",
      "hex": "#787A6C",
      "hue_group": "\u7070",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u9752\u949D",
      "hex": "#7B8EA1",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7FA4\u9752",
      "hex": "#5376A5",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7EC0\u9752",
      "hex": "#2E5A7C",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7559\u7EC0",
      "hex": "#25466E",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6DF1\u7EC0",
      "hex": "#15325C",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u85E4\u7D2B",
      "hex": "#5A4A6A",
      "hue_group": "\u7D2B",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6DF1\u7D2B",
      "hex": "#3A2D5A",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u7D2B\u7EC0",
      "hex": "#322A4A",
      "hue_group": "\u84DD",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u6D85\u8272",
      "hex": "#673E2B",
      "hue_group": "\u6A59",
      "source": "\u534E\u8272"
    },
    {
      "name_zh": "\u58A8",
      "hex": "#595857",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9ED2",
      "hex": "#2B2B2B",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6F06\u9ED2",
      "hex": "#0D0D0D",
      "hue_group": "\u9ED1",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u4E01\u5B50\u8272",
      "hex": "#EFCD9A",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u4E9C\u9EBB\u8272",
      "hex": "#D6C6AF",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u67AF\u8272",
      "hex": "#E0C38C",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u571F\u8272",
      "hex": "#BC763C",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9EC4\u571F\u8272",
      "hex": "#C39143",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u714E\u8336\u8272",
      "hex": "#8C6450",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7126\u8336",
      "hex": "#6F4B3E",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6817\u8272",
      "hex": "#762F07",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u80E1\u6843\u8272",
      "hex": "#A86F4C",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6E0B\u7D19\u8272",
      "hex": "#946243",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5F01\u67C4\u8272",
      "hex": "#8F2E14",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u4EE3\u8D6D",
      "hex": "#BB5535",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D05\u7DCB",
      "hex": "#E83929",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7329\u3005\u7DCB",
      "hex": "#E2041B",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D05",
      "hex": "#D7003A",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u97D3\u7D05\u82B1",
      "hex": "#EA0032",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9280\u6731",
      "hex": "#C85554",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8D64\u4E39",
      "hex": "#CE5242",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D05\u8D64",
      "hex": "#E5004F",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6731\u83EF",
      "hex": "#E8AEB7",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u64AB\u5B50\u8272",
      "hex": "#EEBBCB",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u77F3\u7AF9\u8272",
      "hex": "#E5ABBE",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u67D1\u5B50\u8272",
      "hex": "#F08300",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u91D1\u8336",
      "hex": "#C7802D",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u72D0\u8272",
      "hex": "#C38743",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9EC4\u673D\u8449",
      "hex": "#D3A243",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5C71\u5439\u8336",
      "hex": "#C89932",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u82A5\u5B50\u8272",
      "hex": "#C3B091",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7825\u7C89\u8272",
      "hex": "#F4DDA5",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u808C\u8272",
      "hex": "#F1BF99",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u82E5\u7DD1",
      "hex": "#98D98E",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6D45\u7DD1",
      "hex": "#88CB7F",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8584\u7DD1",
      "hex": "#69B076",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5E72\u8349\u8272",
      "hex": "#92B5A9",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9752\u78C1\u9F20",
      "hex": "#B4CEBD",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8584\u9752",
      "hex": "#93B881",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u67F3\u9F20",
      "hex": "#C8D5BB",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u88CF\u8449\u8272",
      "hex": "#C1D8AC",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5C71\u8475\u8272",
      "hex": "#A8BF93",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8001\u7AF9\u8272",
      "hex": "#769164",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u52FF\u5FD8\u8349\u8272",
      "hex": "#89C3EB",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9752\u85E4\u8272",
      "hex": "#84A2D4",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u767D\u85CD",
      "hex": "#C1E4E9",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8584\u82B1\u8272",
      "hex": "#A8C9D4",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9306\u6D45\u8471",
      "hex": "#6C848D",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9752\u920D",
      "hex": "#4F6F8F",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9244\u7D3A",
      "hex": "#17184B",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D3A\u9752",
      "hex": "#192F60",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7559\u7D3A",
      "hex": "#1C305C",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9752\u58A8",
      "hex": "#474A4D",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u767D\u85E4",
      "hex": "#DBD0E6",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8584\u85E4",
      "hex": "#C9AEDE",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u85E4\u9F20",
      "hex": "#A6A5C4",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u534A\u8272",
      "hex": "#A69ABD",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6D45\u7D2B",
      "hex": "#C4A3BF",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D05\u85E4",
      "hex": "#CFA0E9",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u83D6\u84B2\u8272",
      "hex": "#CC7EB1",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D2B\u82D1\u8272",
      "hex": "#867BA9",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7ADC\u80C6\u8272",
      "hex": "#9079AD",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6EC5\u7D2B",
      "hex": "#594255",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8DEF\u8003\u8336",
      "hex": "#8D6449",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6C5F\u6238\u8336",
      "hex": "#A13D2D",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6A9C\u76AE\u8272",
      "hex": "#7B4741",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7164\u7AF9\u8272",
      "hex": "#6F514C",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D05\u6D88\u9F20",
      "hex": "#524748",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9DAF\u8272",
      "hex": "#724938",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u67F4\u8272",
      "hex": "#B28C6E",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u56E3\u5341\u90CE\u8336",
      "hex": "#9F5233",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u67FF\u6E0B\u8272",
      "hex": "#9F6F55",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u767D\u9F20",
      "hex": "#DCE6E9",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9280\u9F20",
      "hex": "#AFA99E",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u932B\u8272",
      "hex": "#9EA1A3",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u925B\u8272",
      "hex": "#7B7C7D",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u920D\u8272",
      "hex": "#727171",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6D88\u70AD\u8272",
      "hex": "#524E4D",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u85CD\u58A8\u8336",
      "hex": "#3A4861",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6AB3\u6994\u5B50\u67D3",
      "hex": "#3D3D3D",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u61B2\u6CD5\u8272",
      "hex": "#2E2E2E",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9ED2\u6A61",
      "hex": "#252321",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6DE1\u7D05\u85E4",
      "hex": "#E6CDEF",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6843\u82B1\u8272",
      "hex": "#E198B4",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D05\u6885\u9F20",
      "hex": "#E8D3D1",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8584\u6843\u8272",
      "hex": "#F7E0E4",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6DE1\u7D05",
      "hex": "#F6B894",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8584\u7D05\u6885",
      "hex": "#E597B2",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9577\u6625\u8272",
      "hex": "#C97586",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6885\u9F20",
      "hex": "#C099A0",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8607\u82B3\u9999",
      "hex": "#A86965",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6D45\u8607\u82B3",
      "hex": "#A25768",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u4E8C\u85CD",
      "hex": "#915C8B",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u4EAC\u85E4",
      "hex": "#B44C97",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u4F3C\u7D2B",
      "hex": "#513743",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u83DC\u7A2E\u6CB9\u8272",
      "hex": "#A17917",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9B31\u91D1\u8272",
      "hex": "#FABF14",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u627F\u548C\u8272",
      "hex": "#E7D040",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9752\u673D\u8449",
      "hex": "#ADA250",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6D77\u677E\u8272",
      "hex": "#726D40",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5C71\u9CE9\u8272",
      "hex": "#767C6B",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5229\u4F11\u8272",
      "hex": "#8F8667",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7483\u5BDB\u8336",
      "hex": "#6A5D21",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5A9A\u8336",
      "hex": "#716246",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u767D\u8336",
      "hex": "#DCD3B2",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7A7A\u4E94\u500D\u5B50\u8272",
      "hex": "#9D896C",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u751F\u58C1\u8272",
      "hex": "#94846A",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8089\u6842\u8272",
      "hex": "#C66B27",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8D64\u9285\u8272",
      "hex": "#752100",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9306\u8272",
      "hex": "#6C3524",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6731\u9DFA\u8272",
      "hex": "#F4B3C2",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u685C\u8C9D",
      "hex": "#FEDFE1",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u685C\u8272",
      "hex": "#FEF4F4",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8584\u685C",
      "hex": "#FDEFF2",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u685C\u9F20",
      "hex": "#E9DFE5",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8679\u8272",
      "hex": "#F6BFBC",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u73CA\u745A\u8272",
      "hex": "#F5B1AA",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u4E00\u65A4\u67D3",
      "hex": "#F5B199",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5B8D\u8272",
      "hex": "#F2A0A1",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8584\u7D05",
      "hex": "#F0908D",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u751A\u4E09\u7D05",
      "hex": "#EE827C",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6843\u8272",
      "hex": "#F09199",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9D07\u9F20",
      "hex": "#E4D2D8",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8594\u8587\u8272",
      "hex": "#E73562",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5C0F\u8C46\u8272",
      "hex": "#96514D",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8607\u82B3",
      "hex": "#9E3D3F",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u771F\u6731",
      "hex": "#EC6D51",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u831C\u8272",
      "hex": "#B7282E",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u81D9\u8102\u8272",
      "hex": "#B94047",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D05\u6D77\u8001\u8336",
      "hex": "#A73836",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6817\u6885",
      "hex": "#852E19",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6D77\u8001\u8336",
      "hex": "#773C30",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6DF1\u7DCB",
      "hex": "#C20024",
      "hue_group": "\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9EC4\u91D1",
      "hex": "#E6B422",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5C71\u5439\u8272",
      "hex": "#F8B500",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u84B2\u516C\u82F1\u8272",
      "hex": "#FFD900",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u83DC\u306E\u82B1\u8272",
      "hex": "#FFEC47",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9EC4\u6A97\u8272",
      "hex": "#FEF263",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5375\u8272",
      "hex": "#FCD575",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5208\u5B89\u8272",
      "hex": "#F5E56B",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7389\u8700\u9ECD\u8272",
      "hex": "#EEC362",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u82B1\u8449\u8272",
      "hex": "#FBD26B",
      "hue_group": "\u6A59",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u67AF\u8349\u8272",
      "hex": "#E4DC8A",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u840C\u8471\u8272",
      "hex": "#006E54",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u82E5\u8449\u8272",
      "hex": "#B9D08B",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u82E5\u8349\u8272",
      "hex": "#C3D825",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9DAF\u8336",
      "hex": "#928C36",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u62B9\u8336\u8272",
      "hex": "#C5C56A",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u67F3\u8272",
      "hex": "#A8C97F",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u677E\u8449\u8272",
      "hex": "#839B5C",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5E38\u78D0\u8272",
      "hex": "#007B43",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7DD1\u9752\u8272",
      "hex": "#47885E",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5343\u6B73\u7DD1",
      "hex": "#316745",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6DF1\u7DD1",
      "hex": "#00552E",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9752\u78C1\u8272",
      "hex": "#7EBEA5",
      "hue_group": "\u7EFF",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9752\u7AF9\u8272",
      "hex": "#7EBEAB",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7FE1\u7FE0\u8272",
      "hex": "#38B48B",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6D45\u8471\u8272",
      "hex": "#00A3AF",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6C34\u8272",
      "hex": "#BCD8E8",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7A7A\u8272",
      "hex": "#A0D8EF",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u74F6\u8997",
      "hex": "#A2D7DD",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u767D\u7FA4",
      "hex": "#83CCD2",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u79D8\u8272",
      "hex": "#ABCED8",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5FA1\u53EC\u5FA1\u7D0D\u6238",
      "hex": "#4C6473",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u85CD\u8272",
      "hex": "#165E83",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D0D\u6238\u8272",
      "hex": "#008899",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7E39\u8272",
      "hex": "#2792C3",
      "hue_group": "\u9752",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7FA4\u9752\u8272",
      "hex": "#4C6CB3",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7460\u7483\u8272",
      "hex": "#1E50A2",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D3A\u8272",
      "hex": "#223A70",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u53E4\u4EE3\u7D2B",
      "hex": "#895B8A",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u85E4\u8272",
      "hex": "#BAA5CC",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u85E4\u7D2B",
      "hex": "#A59ACA",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u83EB\u8272",
      "hex": "#7058A3",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6854\u6897\u8272",
      "hex": "#5654A2",
      "hue_group": "\u84DD",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u6C5F\u6238\u7D2B",
      "hex": "#745399",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u672C\u7D2B",
      "hex": "#65318E",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8461\u8404\u8272",
      "hex": "#640125",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u8304\u5B50\u7D3A",
      "hex": "#824880",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D2B\u7D3A",
      "hex": "#460E44",
      "hue_group": "\u7D2B",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "Crimson",
      "hex": "#DC143C",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Scarlet",
      "hex": "#FF2400",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Vermillion",
      "hex": "#E34234",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Carmine",
      "hex": "#960018",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Burgundy",
      "hex": "#800020",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Maroon",
      "hex": "#800000",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Ruby",
      "hex": "#E0115F",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Rose",
      "hex": "#FF007F",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Coral",
      "hex": "#FF7F50",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Salmon",
      "hex": "#FA8072",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Orange",
      "hex": "#FF7F00",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Tangerine",
      "hex": "#FF9966",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Apricot",
      "hex": "#FBCEB1",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Peach",
      "hex": "#FFCBA4",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Burnt Orange",
      "hex": "#CC5500",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Gold",
      "hex": "#FFD700",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Canary",
      "hex": "#FFEF00",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Amber",
      "hex": "#FFBF00",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Cream",
      "hex": "#FFFDD0",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Ivory",
      "hex": "#FFFFF0",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Mustard",
      "hex": "#FFDB58",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Ochre",
      "hex": "#CC7722",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Emerald",
      "hex": "#50C878",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Jade",
      "hex": "#00A86B",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Olive",
      "hex": "#808000",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Lime",
      "hex": "#00FF00",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Mint",
      "hex": "#3EB489",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Teal",
      "hex": "#008080",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Forest",
      "hex": "#228B22",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Sage",
      "hex": "#BCB88A",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Chartreuse",
      "hex": "#7FFF00",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Pistachio",
      "hex": "#93C572",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Navy",
      "hex": "#000080",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Royal Blue",
      "hex": "#4169E1",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Sky Blue",
      "hex": "#87CEEB",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Sapphire",
      "hex": "#0F52BA",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Cerulean",
      "hex": "#007BA7",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Azure",
      "hex": "#007FFF",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Turquoise",
      "hex": "#40E0D0",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Aquamarine",
      "hex": "#7FFFD4",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Powder Blue",
      "hex": "#B0E0E6",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Purple",
      "hex": "#800080",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Violet",
      "hex": "#EE82EE",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Lavender",
      "hex": "#E6E6FA",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Amethyst",
      "hex": "#9966CC",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Plum",
      "hex": "#DDA0DD",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Mauve",
      "hex": "#E0B0FF",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Orchid",
      "hex": "#DA70D6",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Magenta",
      "hex": "#FF00FF",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Pink",
      "hex": "#FFC0CB",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Hot Pink",
      "hex": "#FF69B4",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Blush",
      "hex": "#DE5D83",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Baby Pink",
      "hex": "#F4C2C2",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Brown",
      "hex": "#964B00",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Chocolate",
      "hex": "#7B3F00",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Coffee",
      "hex": "#6F4E37",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Sienna",
      "hex": "#A0522D",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Tan",
      "hex": "#D2B48C",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Beige",
      "hex": "#F5F5DC",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Caramel",
      "hex": "#FFD59A",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Silver",
      "hex": "#C0C0C0",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Charcoal",
      "hex": "#36454F",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Slate",
      "hex": "#708090",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Ash",
      "hex": "#B2BEB5",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Pearl",
      "hex": "#FDEEF4",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Ebony",
      "hex": "#555D50",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Jet",
      "hex": "#343434",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Onyx",
      "hex": "#353839",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Venetian Red",
      "hex": "#C80815",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Terra Cotta",
      "hex": "#E2725B",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Rust",
      "hex": "#B7410E",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Brick Red",
      "hex": "#CB4154",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Raspberry",
      "hex": "#E30B5C",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Cherry",
      "hex": "#DE3163",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Garnet",
      "hex": "#733635",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Wine",
      "hex": "#722F37",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Claret",
      "hex": "#7F1734",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Pumpkin",
      "hex": "#FF7518",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Mango",
      "hex": "#FF8243",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Papaya",
      "hex": "#FFEFD5",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Carrot",
      "hex": "#ED9121",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Marigold",
      "hex": "#EAA221",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Saffron",
      "hex": "#F4C430",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Banana",
      "hex": "#FFE135",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Flax",
      "hex": "#EEDC82",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Champagne",
      "hex": "#F7E7CE",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Vanilla",
      "hex": "#F3E5AB",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Straw",
      "hex": "#E4D96F",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Moss",
      "hex": "#8A9A5B",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Fern",
      "hex": "#4F7942",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Shamrock",
      "hex": "#009E60",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Kelly Green",
      "hex": "#4CBB17",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Hunter Green",
      "hex": "#355E3B",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Malachite",
      "hex": "#0BDA51",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Celadon",
      "hex": "#ACE1AF",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Sea Foam",
      "hex": "#9FE2BF",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Seafoam",
      "hex": "#71EEB8",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Viridian",
      "hex": "#40826D",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Ultramarine",
      "hex": "#120A8F",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Electric Blue",
      "hex": "#7DF9FF",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Peacock Blue",
      "hex": "#005F69",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Denim",
      "hex": "#1560BD",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Periwinkle",
      "hex": "#CCCCFF",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Baby Blue",
      "hex": "#89CFF0",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Ice Blue",
      "hex": "#99FFFF",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Midnight Blue",
      "hex": "#191970",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Wisteria",
      "hex": "#C9A0DC",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Lilac",
      "hex": "#C8A2C8",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Heather",
      "hex": "#B7A9C4",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Mulberry",
      "hex": "#C54B8C",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Boysenberry",
      "hex": "#873260",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Eggplant",
      "hex": "#614051",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Aubergine",
      "hex": "#3D0734",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Byzantium",
      "hex": "#702963",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Thistle",
      "hex": "#D8BFD8",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Carnation",
      "hex": "#FFA6C9",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Flamingo",
      "hex": "#FC8EAC",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Dusty Rose",
      "hex": "#DCAE96",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Rose Quartz",
      "hex": "#AA98A9",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Mahogany",
      "hex": "#C04000",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Chestnut",
      "hex": "#954535",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Cinnamon",
      "hex": "#D2691E",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Ginger",
      "hex": "#B06500",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Tawny",
      "hex": "#CD5700",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Sepia",
      "hex": "#704214",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Umber",
      "hex": "#635147",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Taupe",
      "hex": "#483C32",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Fawn",
      "hex": "#E5AA70",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Camel",
      "hex": "#C19A6B",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Platinum",
      "hex": "#E5E4E2",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Gunmetal",
      "hex": "#2A3439",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Pewter",
      "hex": "#8F8F8F",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Smoke",
      "hex": "#738276",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Dove Gray",
      "hex": "#696969",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Battleship Gray",
      "hex": "#848482",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Graphite",
      "hex": "#383428",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Alizarin",
      "hex": "#E32636",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Amaranth",
      "hex": "#E52B50",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Cardinal",
      "hex": "#C41E3A",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Carnelian",
      "hex": "#B31B1B",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Poppy",
      "hex": "#E35335",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Hibiscus",
      "hex": "#B6316C",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Watermelon",
      "hex": "#FD4659",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Strawberry",
      "hex": "#FC5A8D",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Persimmon",
      "hex": "#EC5800",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Pumpkin Spice",
      "hex": "#C45C26",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Burnt Sienna",
      "hex": "#E97451",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Melon",
      "hex": "#FEBAAD",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Cantaloupe",
      "hex": "#FFA62F",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Maize",
      "hex": "#FBEC5D",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Daffodil",
      "hex": "#FFFF31",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Sunflower",
      "hex": "#FFDA03",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Jonquil",
      "hex": "#F4CA16",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Turmeric",
      "hex": "#FFD54F",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Avocado",
      "hex": "#568203",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Asparagus",
      "hex": "#87A96B",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Basil",
      "hex": "#579229",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Clover",
      "hex": "#384910",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Eucalyptus",
      "hex": "#44D7A8",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Jungle Green",
      "hex": "#29AB87",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Pine",
      "hex": "#01796F",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Seaweed",
      "hex": "#2E8B57",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Spruce",
      "hex": "#2C5545",
      "hue_group": "\u7EFF",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Aegean",
      "hex": "#1F456E",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Arctic",
      "hex": "#82CFFD",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Bluebell",
      "hex": "#A2A2D0",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Capri",
      "hex": "#00BFFF",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Celeste",
      "hex": "#B2FFFF",
      "hue_group": "\u9752",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Cornflower",
      "hex": "#6495ED",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Egyptian Blue",
      "hex": "#1034A6",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Maya Blue",
      "hex": "#73C2FB",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Oxford Blue",
      "hex": "#002147",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Yale Blue",
      "hex": "#0F4D92",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "African Violet",
      "hex": "#B284BE",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Clematis",
      "hex": "#9457EB",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Iris",
      "hex": "#5A4FCF",
      "hue_group": "\u84DD",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Petunia",
      "hex": "#9E5E9B",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Pansy",
      "hex": "#78184A",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Phlox",
      "hex": "#DF00FF",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Royal Purple",
      "hex": "#7851A9",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Tyrian Purple",
      "hex": "#66023C",
      "hue_group": "\u7D2B\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Veronica",
      "hex": "#A020F0",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Buff",
      "hex": "#F0DC82",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Ecru",
      "hex": "#C2B280",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Jasmine",
      "hex": "#F8DE7E",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Linen",
      "hex": "#FAF0E6",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Wheat",
      "hex": "#F5DEB3",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Bisque",
      "hex": "#FFE4C4",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Auburn",
      "hex": "#A52A2A",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Bronze",
      "hex": "#CD7F32",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Copper",
      "hex": "#B87333",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Mocha",
      "hex": "#967117",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Saddle Brown",
      "hex": "#8B4513",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Walnut",
      "hex": "#773F1A",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Beaver",
      "hex": "#9F8170",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Bole",
      "hex": "#79443B",
      "hue_group": "\u7EA2",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Steel Grey",
      "hex": "#71797E",
      "hue_group": "\u7070",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Alabaster",
      "hex": "#EDEAE0",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Bone",
      "hex": "#E3DAC9",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Eggshell",
      "hex": "#F0EAD6",
      "hue_group": "\u9EC4",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Magnolia",
      "hex": "#F8F4FF",
      "hue_group": "\u7D2B",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Seashell",
      "hex": "#FFF5EE",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "White Smoke",
      "hex": "#F5F5F5",
      "hue_group": "\u767D",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "Floral White",
      "hex": "#FFFAF0",
      "hue_group": "\u6A59",
      "source": "\u6D0B\u8272"
    },
    {
      "name_zh": "\u80E1\u7C89\u8272",
      "hex": "#FFFFFC",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u751F\u6210\u8272",
      "hex": "#FBFAF5",
      "hue_group": "\u9EC4",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u767D\u7DF4",
      "hex": "#F3F3F2",
      "hue_group": "\u767D",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u7D20\u9F20",
      "hex": "#9FA0A0",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u9F20\u8272",
      "hex": "#949495",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    },
    {
      "name_zh": "\u5229\u4F11\u9F20",
      "hex": "#888E7E",
      "hue_group": "\u7070",
      "source": "\u548C\u8272"
    }
  ],
  "formulas": {
    "complementary": {
      "name_zh": "\u4E92\u8865\u8272",
      "description": ""
    },
    "analogous": {
      "name_zh": "\u7C7B\u4F3C\u8272",
      "description": ""
    },
    "triadic": {
      "name_zh": "\u4E09\u89D2\u914D\u8272",
      "description": ""
    },
    "split_complementary": {
      "name_zh": "\u5206\u88C2\u8865\u8272",
      "description": ""
    },
    "monochromatic": {
      "name_zh": "\u5355\u8272\u6DF1\u6D45",
      "description": ""
    },
    "custom": {
      "name_zh": "\u81EA\u5B9A\u4E49\u56FA\u5B9A\u8272",
      "description": ""
    },
    "oklab_complementary": {
      "name_zh": "OKLab \u4E92\u8865\u8272",
      "description": ""
    }
  },
  "presets": [
    {
      "name": "\u5408\u5531\uFF08\u6292\u60C5\uFF09",
      "formula": "monochromatic",
      "base_name": "\u7FA4\u9752",
      "base_hex": "#4C8DAE",
      "scene_type": "\u6821\u56ED-\u5408\u5531",
      "style_tags": [
        "\u6292\u60C5",
        "\u5B89\u9759",
        "\u7EDF\u4E00",
        "\u6DF1\u84DD",
        "\u5E84\u91CD"
      ],
      "color_source": "\u534E\u8272",
      "hint": "\u5355\u8272\u6DF1\u6D45\u6E10\u53D8\uFF0C\u7EDF\u4E00\u5B89\u9759\u7F8E",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u7EC0\u9752",
          "hex": "#2E5A7C"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u5929\u6C34\u78A7",
          "hex": "#8ABCD1"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u971C\u84DD",
          "hex": "#B8D4E3"
        },
        {
          "role": "\u80CC\u666F\u8272",
          "name_zh": "\u54C1\u84DD",
          "hex": "#2F4F4F"
        }
      ]
    },
    {
      "name": "\u5408\u5531\uFF08\u6FC0\u6602\uFF09",
      "formula": "complementary",
      "base_name": "\u6731\u7802",
      "base_hex": "#FF461F",
      "scene_type": "\u6821\u56ED-\u5408\u5531",
      "style_tags": [
        "\u6FC0\u6602",
        "\u529B\u91CF",
        "\u5F3A\u5BF9\u6BD4",
        "\u7EA2\u84DD\u649E\u8272"
      ],
      "color_source": "\u534E\u8272",
      "hint": "\u7EA2+\u9752\u7EFF\u5BF9\u6BD4\uFF0C\u5F3A\u89C6\u89C9\u51B2\u51FB",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6731\u7802",
          "hex": "#FF461F"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Capri",
          "hex": "#00BFFF"
        }
      ]
    },
    {
      "name": "\u821E\u8E48\uFF08\u6C11\u65CF\uFF09",
      "formula": "analogous",
      "base_name": "\u571F\u9EC4",
      "base_hex": "#D6A01D",
      "scene_type": "\u6821\u56ED-\u821E\u8E48",
      "style_tags": [
        "\u6C11\u65CF",
        "\u4F20\u7EDF",
        "\u571F\u8272",
        "\u7C7B\u4F3C\u8272\u6E10\u53D8"
      ],
      "color_source": "\u534E\u8272",
      "hint": "\u571F\u9EC4+\u8D6D+\u68D5\uFF0C\u7C7B\u4F3C\u8272\u6E10\u53D8\uFF0C\u6C11\u65CF\u98CE",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u843D\u7EA2",
          "hex": "#C73E1D"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u571F\u9EC4",
          "hex": "#D6A01D"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u5AE9\u7EFF",
          "hex": "#BDDD22"
        }
      ]
    },
    {
      "name": "\u821E\u8E48\uFF08\u53E4\u5178\uFF09",
      "formula": "analogous",
      "base_name": "\u85D5\u8377",
      "base_hex": "#E4C6D0",
      "scene_type": "\u6821\u56ED-\u821E\u8E48",
      "style_tags": [
        "\u53E4\u5178",
        "\u67D4\u7F8E",
        "\u6DE1\u96C5",
        "\u7C89\u7D2B\u6E10\u53D8"
      ],
      "color_source": "\u534E\u8272",
      "hint": "\u85D5+\u7D2B+\u96EA\u9752\uFF0C\u7C7B\u4F3C\u8272\u6E10\u53D8\uFF0C\u53E4\u5178\u7F8E",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u7D2B\u7C89",
          "hex": "#D6A8C9"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u85D5\u8377",
          "hex": "#E4C6D0"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7D05\u6885\u9F20",
          "hex": "#E8D3D1"
        }
      ]
    },
    {
      "name": "\u6717\u8BF5\uFF08\u7EA2\u6B4C\uFF09",
      "formula": "complementary",
      "base_name": "\u4E2D\u56FD\u7EA2",
      "base_hex": "#AA2116",
      "scene_type": "\u6821\u56ED-\u6717\u8BF5",
      "style_tags": [
        "\u7EA2\u6B4C",
        "\u821E\u53F0\u7126\u70B9",
        "\u7EA2\u7EFF\u649E\u8272",
        "\u7231\u56FD"
      ],
      "color_source": "\u534E\u8272",
      "hint": "\u4E2D\u56FD\u7EA2+\u677E\u67CF\u7EFF\uFF0C\u821E\u53F0\u7126\u70B9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u4E2D\u56FD\u7EA2",
          "hex": "#AA2116"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u77F3\u9752",
          "hex": "#0F95A0"
        }
      ]
    },
    {
      "name": "\u8BFE\u672C\u5267",
      "formula": "triadic",
      "base_name": "\u660E\u9EC4",
      "base_hex": "#F2CE2B",
      "scene_type": "\u6821\u56ED-\u8BFE\u672C\u5267",
      "style_tags": [
        "\u8BFE\u672C\u5267",
        "\u591A\u89D2\u8272",
        "\u4E09\u89D2\u914D\u8272",
        "\u6D3B\u6CFC"
      ],
      "color_source": "\u534E\u8272",
      "hint": "\u9EC4+\u7EA2+\u84DD\u4E09\u89D2\u5BF9\u7ACB\uFF0C3 \u89D2\u8272\u533A\u5206",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u660E\u9EC4",
          "hex": "#F2CE2B"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6E56\u7EFF",
          "hex": "#25F8CB"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Phlox",
          "hex": "#DF00FF"
        }
      ]
    },
    {
      "name": "\u620F\u5267\uFF08\u60B2\u5267\uFF09",
      "formula": "monochromatic",
      "base_name": "\u9EDB\u84DD",
      "base_hex": "#425066",
      "scene_type": "\u6821\u56ED-\u620F\u5267",
      "style_tags": [
        "\u60B2\u5267",
        "\u6C89\u91CD",
        "\u84DD\u7070\u6DF1\u6D45",
        "\u821E\u53F0\u611F"
      ],
      "color_source": "\u534E\u8272",
      "hint": "\u9EDB\u84DD\u6DF1\u6D45\uFF0C\u821E\u53F0\u6C89\u91CD\u611F",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u85CD\u58A8\u8336",
          "hex": "#3A4861"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u84DD\u7070",
          "hex": "#A1AFC9"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u84DD\u9F20",
          "hex": "#70859D"
        },
        {
          "role": "\u80CC\u666F\u8272",
          "name_zh": "\u85E4\u8272",
          "hex": "#A8B4CC"
        }
      ]
    },
    {
      "name": "\u513F\u7AE5\u8282\u76EE\uFF08\u6B22\u5FEB\uFF09",
      "formula": "split_complementary",
      "base_name": "\u67E0\u6AAC\u9EC4",
      "base_hex": "#FFF44F",
      "scene_type": "\u6821\u56ED-\u513F\u7AE5\u8282\u76EE",
      "style_tags": [
        "\u513F\u7AE5",
        "\u6B22\u5FEB",
        "\u660E\u4EAE",
        "\u5BF9\u6BD4\u9002\u4E2D"
      ],
      "color_source": "\u534E\u8272",
      "hint": "\u9EC4+\u7D2B+\u5929\u84DD\uFF0C\u5BF9\u6BD4\u660E\u4EAE\u4F46\u7EDF\u4E00",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u67E0\u6AAC\u9EC4",
          "hex": "#FFF44F"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Maya Blue",
          "hex": "#73C2FB"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Clematis",
          "hex": "#9457EB"
        }
      ]
    },
    {
      "name": "\u6BD5\u4E1A\u5178\u793C",
      "formula": "analogous",
      "base_name": "\u975B\u9752",
      "base_hex": "#177CB0",
      "scene_type": "\u6821\u56ED-\u5178\u793C",
      "style_tags": [
        "\u6BD5\u4E1A",
        "\u5E84\u91CD",
        "\u84DD\u8272",
        "\u7C7B\u4F3C\u8272"
      ],
      "color_source": "\u534E\u8272",
      "hint": "\u77F3\u9752+\u975B\u9752+\u7460\u7483\u8272\uFF0C\u7C7B\u4F3C\u8272\u7D27\u51D1\u5E84\u91CD\uFF08H\xB120\xB0\uFF09",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u77F3\u9752",
          "hex": "#0F95A0"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u975B\u9752",
          "hex": "#177CB0"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7460\u7483\u8272",
          "hex": "#1E50A2"
        }
      ]
    },
    {
      "name": "\u4E2D\u79CB/\u4F20\u7EDF\u8282\u65E5",
      "formula": "complementary",
      "base_name": "\u4E39\u7802",
      "base_hex": "#FF4C00",
      "scene_type": "\u6821\u56ED-\u4F20\u7EDF\u8282\u65E5",
      "style_tags": [
        "\u4F20\u7EDF\u8282\u65E5",
        "\u4E2D\u79CB",
        "\u7EA2\u84DD\u649E\u8272",
        "\u53E4\u5178"
      ],
      "color_source": "\u534E\u8272",
      "hint": "\u4E39\u7802+\u7FA4\u9752\uFF0C\u4F20\u7EDF\u7EA2+\u84DD",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u4E39\u7802",
          "hex": "#FF4C00"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Capri",
          "hex": "#00BFFF"
        }
      ]
    },
    {
      "name": "\u548C\u670D\u8D70\u79C0\uFF08\u65E5\u5F0F\uFF09",
      "formula": "analogous",
      "base_name": "\u685C\u8272",
      "base_hex": "#FEF4F4",
      "scene_type": "\u56FD\u9645-\u548C\u670D\u79C0",
      "style_tags": [
        "\u548C\u98CE",
        "\u5C11\u5973",
        "\u7C89\u5AE9",
        "\u7C7B\u4F3C\u8272\u6E10\u53D8"
      ],
      "color_source": "\u548C\u8272",
      "hint": "\u6A31+\u6843+\u7EA2\u6885\uFF0C\u7C89\u5AE9\u6E10\u53D8\uFF0C\u5C11\u5973\u611F",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "Pearl",
          "hex": "#FDEEF4"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u685C\u8272",
          "hex": "#FEF4F4"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Linen",
          "hex": "#FAF0E6"
        }
      ]
    },
    {
      "name": "\u8336\u9053\u8868\u6F14",
      "formula": "monochromatic",
      "base_name": "\u5229\u4F11\u8272",
      "base_hex": "#8F8667",
      "scene_type": "\u56FD\u9645-\u8336\u9053",
      "style_tags": [
        "\u8336\u9053",
        "\u7985\u610F",
        "\u7D20\u96C5",
        "\u6A44\u6984\u7EFF\u6E10\u53D8"
      ],
      "color_source": "\u548C\u8272",
      "hint": "\u5229\u4F11+\u677E+\u9752\u78C1\uFF0C\u5355\u8272\u6DF1\u6D45\uFF0C\u7D20\u96C5\u7985\u610F",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "Graphite",
          "hex": "#383428"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u82CD\u9EC4",
          "hex": "#A29B7C"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u9E64\u8272",
          "hex": "#C7C6C0"
        },
        {
          "role": "\u80CC\u666F\u8272",
          "name_zh": "\u714E\u8336",
          "hex": "#474232"
        }
      ]
    },
    {
      "name": "\u6D6E\u4E16\u7ED8\u98CE\u683C",
      "formula": "complementary",
      "base_name": "\u7FA4\u9752\u8272",
      "base_hex": "#4C6CB3",
      "scene_type": "\u56FD\u9645-\u6D6E\u4E16\u7ED8",
      "style_tags": [
        "\u6D6E\u4E16\u7ED8",
        "\u6C5F\u6237",
        "\u84DD\u7EA2\u649E\u8272",
        "\u590D\u53E4"
      ],
      "color_source": "\u548C\u8272",
      "hint": "\u7FA4\u9752+\u6731\u534E\uFF0C\u84DD\u7EA2\u649E\u8272\uFF0C\u6C5F\u6237\u98CE",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u7FA4\u9752\u8272",
          "hex": "#4C6CB3"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u4E4C\u91D1",
          "hex": "#A78E44"
        }
      ]
    },
    {
      "name": "\u65E5\u5F0F\u80FD\u5267",
      "formula": "monochromatic",
      "base_name": "\u53E4\u4EE3\u7D2B",
      "base_hex": "#895B8A",
      "scene_type": "\u56FD\u9645-\u80FD\u5267",
      "style_tags": [
        "\u80FD\u5267",
        "\u795E\u79D8",
        "\u6697\u7D2B",
        "\u5E84\u91CD"
      ],
      "color_source": "\u548C\u8272",
      "hint": "\u53E4\u4EE3\u7D2B+\u85E4\u7D2B+\u534A\u8272\uFF0C\u6697\u7D2B\u6DF1\u6D45\uFF0C\u795E\u79D8",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u8304\u5B50\u7D3A",
          "hex": "#824880"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Thistle",
          "hex": "#D8BFD8"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Lilac",
          "hex": "#C8A2C8"
        },
        {
          "role": "\u80CC\u666F\u8272",
          "name_zh": "\u6697\u7D2B",
          "hex": "#5D3F6A"
        }
      ]
    },
    {
      "name": "\u548C\u592A\u9F13\u8868\u6F14",
      "formula": "complementary",
      "base_name": "\u771F\u6731",
      "base_hex": "#EC6D51",
      "scene_type": "\u56FD\u9645-\u592A\u9F13",
      "style_tags": [
        "\u592A\u9F13",
        "\u529B\u91CF",
        "\u7EA2\u7EFF\u649E\u8272",
        "\u9F13\u70B9"
      ],
      "color_source": "\u548C\u8272",
      "hint": "\u6731\u7EA2+\u840C\u8471\uFF0C\u7EA2\u7EFF\u649E\u8272\uFF0C\u529B\u91CF\u611F",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u771F\u6731",
          "hex": "#EC6D51"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u78A7",
          "hex": "#44CEF6"
        }
      ]
    },
    {
      "name": "\u5723\u8BDE\u8282",
      "formula": "complementary",
      "base_name": "Cherry",
      "base_hex": "#DE3163",
      "scene_type": "\u897F\u65B9\u8282\u65E5-\u5723\u8BDE",
      "style_tags": [
        "\u5723\u8BDE\u8282",
        "\u7EA2\u7EFF\u649E\u8272",
        "\u897F\u65B9\u8282\u65E5",
        "\u7ECF\u5178"
      ],
      "color_source": "\u6D0B\u8272",
      "hint": "\u6A31\u6843\u7EA2+\u51EF\u5229\u7EFF\uFF0C\u7ECF\u5178\u7EA2\u7EFF\u649E\u8272",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "Cherry",
          "hex": "#DE3163"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7FE1\u7FE0",
          "hex": "#3DE1AD"
        }
      ]
    },
    {
      "name": "\u4E07\u5723\u8282",
      "formula": "triadic",
      "base_name": "Pumpkin",
      "base_hex": "#FF7518",
      "scene_type": "\u897F\u65B9\u8282\u65E5-\u4E07\u5723",
      "style_tags": [
        "\u4E07\u5723\u8282",
        "\u6A59\u7D2B\u9ED1",
        "\u4E09\u89D2\u914D\u8272",
        "\u8BE1\u5F02"
      ],
      "color_source": "\u6D0B\u8272",
      "hint": "\u5357\u74DC\u6A59+\u7D2B\u6C34\u6676+\u7EAF\u9ED1\uFF0C\u6A59\u7D2B\u9ED1\u4E09\u89D2",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "Pumpkin",
          "hex": "#FF7518"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Malachite",
          "hex": "#0BDA51"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Clematis",
          "hex": "#9457EB"
        }
      ]
    },
    {
      "name": "\u611F\u6069\u8282",
      "formula": "analogous",
      "base_name": "Chestnut",
      "base_hex": "#954535",
      "scene_type": "\u897F\u65B9\u8282\u65E5-\u611F\u6069",
      "style_tags": [
        "\u611F\u6069\u8282",
        "\u68D5\u8272\u6E10\u53D8",
        "\u6E29\u6696",
        "\u5BB6\u5EAD"
      ],
      "color_source": "\u6D0B\u8272",
      "hint": "\u6817\u68D5+\u6843\u82B1\u5FC3\u6728+\u67FF\u5B50\uFF0C\u68D5\u8272\u6E10\u53D8\u6E29\u6696",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6D0B\u8471\u7D2B",
          "hex": "#A8456B"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Chestnut",
          "hex": "#954535"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u79CB\u8272",
          "hex": "#896C39"
        }
      ]
    },
    {
      "name": "\u897F\u65B9\u5A5A\u793C",
      "formula": "monochromatic",
      "base_name": "Alabaster",
      "base_hex": "#EDEAE0",
      "scene_type": "\u897F\u65B9\u8282\u65E5-\u5A5A\u793C",
      "style_tags": [
        "\u5A5A\u793C",
        "\u767D\u91D1",
        "\u5355\u8272\u6DF1\u6D45",
        "\u5723\u6D01"
      ],
      "color_source": "\u6D0B\u8272",
      "hint": "\u767D\u91D1+\u9999\u69DF+\u73CD\u73E0\uFF0C\u767D\u91D1\u5355\u8272\u6DF1\u6D45",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u5229\u4F11\u8272",
          "hex": "#8F8667"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Ecru",
          "hex": "#C2B280"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Graphite",
          "hex": "#383428"
        },
        {
          "role": "\u80CC\u666F\u8272",
          "name_zh": "\u5A9A\u8336",
          "hex": "#716246"
        }
      ]
    },
    {
      "name": "\u513F\u7AE5\u751F\u65E5\u6D3E\u5BF9",
      "formula": "triadic",
      "base_name": "Pink",
      "base_hex": "#FFC0CB",
      "scene_type": "\u897F\u65B9\u8282\u65E5-\u751F\u65E5",
      "style_tags": [
        "\u513F\u7AE5\u751F\u65E5",
        "\u4E09\u89D2\u7C89\u5F69",
        "\u6D3B\u6CFC",
        "\u7C89\u84DD"
      ],
      "color_source": "\u6D0B\u8272",
      "hint": "\u7C89+\u85B0\u8863\u8349+\u5929\u84DD\uFF0C\u4E09\u89D2\u7C89\u5F69\u6D3B\u6CFC",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "Pink",
          "hex": "#FFC0CB"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7389\u7C2A",
          "hex": "#E4FFE6"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "Periwinkle",
          "hex": "#CCCCFF"
        }
      ]
    },
    {
      "name": "\u8F7B\u5962\xB7\u9AD8\u7EA7\u7248\uFF08\u65B9\u6848 10\uFF09",
      "formula": "custom",
      "base_name": "\u6DF1\u9152\u7EA2",
      "base_hex": "#913B4E",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8F7B\u5962",
      "style_tags": [
        "\u9AD8\u7EA7",
        "\u514B\u5236",
        "\u8D28\u611F",
        "\u8F7B\u5962",
        "\u54C1\u724C"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u9AD8\u7AEF\u6D88\u8D39\u3001\u73E0\u5B9D\u3001\u5BB6\u5C45\u4E0E\u751F\u6D3B\u65B9\u5F0F\u54C1\u724C",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6DF1\u9152\u7EA2",
          "hex": "#913B4E"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6696\u68D5",
          "hex": "#9D6258"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEE7E9"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6A44\u6984\u9EC4",
          "hex": "#80792D"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496\u5561",
          "hex": "#4F3037"
        }
      ]
    },
    {
      "name": "\u8F7B\u5962\xB7\u8D28\u611F\u7248\uFF08\u65B9\u6848 9\uFF09",
      "formula": "custom",
      "base_name": "\u6DF1\u9152\u7EA2",
      "base_hex": "#913B58",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8F7B\u5962",
      "style_tags": [
        "\u9AD8\u7EA7",
        "\u514B\u5236",
        "\u8D28\u611F",
        "\u8F7B\u5962",
        "\u54C1\u724C"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u9AD8\u7AEF\u6D88\u8D39\u3001\u73E0\u5B9D\u3001\u5BB6\u5C45\u4E0E\u751F\u6D3B\u65B9\u5F0F\u54C1\u724C",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6DF1\u9152\u7EA2",
          "hex": "#913B58"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6696\u68D5",
          "hex": "#9D5A58"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C89\u7070",
          "hex": "#D4C4C9"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6A44\u6984\u9EC4",
          "hex": "#80702D"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496\u5561",
          "hex": "#462B34"
        }
      ]
    },
    {
      "name": "\u8F7B\u5962\xB7\u54C1\u724C\u9875\uFF08\u65B9\u6848 4\uFF09",
      "formula": "custom",
      "base_name": "\u6DF1\u7D2B\u7EA2",
      "base_hex": "#913B8A",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8F7B\u5962",
      "style_tags": [
        "\u9AD8\u7EA7",
        "\u514B\u5236",
        "\u8D28\u611F",
        "\u8F7B\u5962",
        "\u54C1\u724C",
        "\u54C1\u724C\u9875"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u9AD8\u7AEF\u6D88\u8D39\u3001\u73E0\u5B9D\u3001\u5BB6\u5C45\u4E0E\u751F\u6D3B\u65B9\u5F0F\u54C1\u724C",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6DF1\u7D2B\u7EA2",
          "hex": "#913B8A"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u73AB\u7EA2",
          "hex": "#9D587E"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7D2B",
          "hex": "#EEE7ED"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6DF1\u7EA2\u6728",
          "hex": "#803F2D"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u7D2B",
          "hex": "#623C5F"
        }
      ]
    },
    {
      "name": "\u8F7B\u5962\xB7\u4E3B\u89C6\u89C9\uFF08\u65B9\u6848 1\uFF09",
      "formula": "custom",
      "base_name": "\u7D2B\u8272",
      "base_hex": "#7A3B91",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8F7B\u5962",
      "style_tags": [
        "\u9AD8\u7EA7",
        "\u514B\u5236",
        "\u8D28\u611F",
        "\u8F7B\u5962",
        "\u54C1\u724C",
        "\u4E3B\u89C6\u89C9"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u9AD8\u7AEF\u6D88\u8D39\u3001\u73E0\u5B9D\u3001\u5BB6\u5C45\u4E0E\u751F\u6D3B\u65B9\u5F0F\u54C1\u724C",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u7D2B\u8272",
          "hex": "#7A3B91"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7C89\u7D2B",
          "hex": "#9D5896"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7D2B",
          "hex": "#ECE7EE"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6697\u7EA2",
          "hex": "#802D38"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u7D2B\u9ED1",
          "hex": "#3E2B46"
        }
      ]
    },
    {
      "name": "\u56FD\u98CE\xB7\u9AD8\u7EA7\u7248\uFF08\u65B9\u6848 10\uFF09",
      "formula": "custom",
      "base_name": "\u6A44\u6984\u7EFF",
      "base_hex": "#799A3C",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u56FD\u98CE",
      "style_tags": [
        "\u4E1C\u65B9",
        "\u7559\u767D",
        "\u96C5\u81F4",
        "\u56FD\u98CE",
        "\u6587\u521B"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u4E1C\u65B9\u6587\u5316\u3001\u6587\u521B\u3001\u8282\u65E5\u548C\u8336\u996E\u54C1\u724C",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6A44\u6984\u7EFF",
          "hex": "#799A3C"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u8349\u7EFF",
          "hex": "#6FA659"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7EFF",
          "hex": "#ECEEE7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6DF1\u7EFF\u677E\u77F3",
          "hex": "#2E8A5A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u6A44\u6984\u7EFF",
          "hex": "#444F30"
        }
      ]
    },
    {
      "name": "\u56FD\u98CE\xB7\u6696\u5149\u611F\uFF08\u65B9\u6848 7\uFF09",
      "formula": "custom",
      "base_name": "\u6A44\u6984\u9EC4",
      "base_hex": "#9A9A3C",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u56FD\u98CE",
      "style_tags": [
        "\u4E1C\u65B9",
        "\u7559\u767D",
        "\u96C5\u81F4",
        "\u56FD\u98CE",
        "\u6696\u5149",
        "\u6E10\u53D8"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u4E1C\u65B9\u6587\u5316\u3001\u6587\u521B\u3001\u8282\u65E5\u548C\u8336\u996E\u54C1\u724C",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6A44\u6984\u9EC4",
          "hex": "#9A9A3C"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u8349\u7EFF",
          "hex": "#8AA659"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7EFF",
          "hex": "#EEEEE7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u4E2D\u7EFF",
          "hex": "#2E8A3A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6697\u9EC4\u7EFF",
          "hex": "#595936"
        }
      ]
    },
    {
      "name": "\u513F\u7AE5\xB7\u9AD8\u7EA7\u7248\uFF08\u65B9\u6848 10\uFF09",
      "formula": "custom",
      "base_name": "\u8482\u8299\u5C3C\u84DD",
      "base_hex": "#5EDCDE",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u513F\u7AE5",
      "style_tags": [
        "\u6D3B\u529B",
        "\u660E\u5FEB",
        "\u7AE5\u8DA3",
        "\u513F\u7AE5",
        "\u4EB2\u5B50"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u4EB2\u5B50\u3001\u6559\u80B2\u3001\u7ED8\u672C\u4E0E\u73A9\u5177\u54C1\u724C\u754C\u9762",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u8482\u8299\u5C3C\u84DD",
          "hex": "#5EDCDE"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6DE1\u84DD",
          "hex": "#8BBCDA"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u84DD",
          "hex": "#E7EEEE"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u7535\u5149\u84DD",
          "hex": "#563EE0"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u84DD\u7070",
          "hex": "#304F4F"
        }
      ]
    },
    {
      "name": "\u513F\u7AE5\xB7\u6696\u5149\u611F\uFF08\u65B9\u6848 7\uFF09",
      "formula": "custom",
      "base_name": "\u8584\u8377\u7EFF",
      "base_hex": "#5EDEB3",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u513F\u7AE5",
      "style_tags": [
        "\u6D3B\u529B",
        "\u660E\u5FEB",
        "\u7AE5\u8DA3",
        "\u513F\u7AE5",
        "\u6696\u5149"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u4EB2\u5B50\u3001\u6559\u80B2\u3001\u7ED8\u672C\u4E0E\u73A9\u5177\u54C1\u724C\u754C\u9762",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u8584\u8377\u7EFF",
          "hex": "#5EDEB3"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6DE1\u9752\u7EFF",
          "hex": "#8BD8DA"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7EFF",
          "hex": "#E7EEEC"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u7535\u5149\u84DD",
          "hex": "#3E5EE0"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u7EFF\u7070",
          "hex": "#36594D"
        }
      ]
    },
    {
      "name": "\u513F\u7AE5\xB7\u6D77\u62A5\u611F\uFF08\u65B9\u6848 3\uFF09",
      "formula": "custom",
      "base_name": "\u5AE9\u7EFF",
      "base_hex": "#5EDE78",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u513F\u7AE5",
      "style_tags": [
        "\u6D3B\u529B",
        "\u660E\u5FEB",
        "\u7AE5\u8DA3",
        "\u513F\u7AE5",
        "\u6D77\u62A5",
        "\u6E10\u53D8"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u4EB2\u5B50\u3001\u6559\u80B2\u3001\u7ED8\u672C\u4E0E\u73A9\u5177\u54C1\u724C\u754C\u9762",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u5AE9\u7EFF",
          "hex": "#5EDE78"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6DE1\u7EFF",
          "hex": "#8BDAB8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7070\u7EFF",
          "hex": "#C4D4C7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u5929\u84DD",
          "hex": "#3EAAE0"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u7EFF",
          "hex": "#36593D"
        }
      ]
    },
    {
      "name": "\u7F8E\u5986\xB7\u9AD8\u7EA7\u7248\uFF08\u65B9\u6848 10\uFF09",
      "formula": "custom",
      "base_name": "\u7C73\u9EC4",
      "base_hex": "#EAD390",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u7F8E\u5986",
      "style_tags": [
        "\u67D4\u7126",
        "\u7CBE\u81F4",
        "\u4EB2\u548C",
        "\u7F8E\u5986",
        "\u5305\u88C5"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u54C1\u724C\u5305\u88C5\u3001\u8BE6\u60C5\u9875\u3001\u67D4\u548C\u9AD8\u7EA7\u5C55\u793A",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u7C73\u9EC4",
          "hex": "#EAD390"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6DE1\u8349\u9EC4",
          "hex": "#E4EAB8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u9EC4",
          "hex": "#EEECE7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u5AE9\u7EFF",
          "hex": "#7FEA71"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u68D5",
          "hex": "#4F4730"
        }
      ]
    },
    {
      "name": "\u7F8E\u5986\xB7\u6696\u5149\u611F\uFF08\u65B9\u6848 7\uFF09",
      "formula": "custom",
      "base_name": "\u7C73\u6843",
      "base_hex": "#EAB490",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u7F8E\u5986",
      "style_tags": [
        "\u67D4\u7126",
        "\u7CBE\u81F4",
        "\u4EB2\u548C",
        "\u7F8E\u5986",
        "\u6696\u5149"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u54C1\u724C\u5305\u88C5\u3001\u8BE6\u60C5\u9875\u3001\u67D4\u548C\u9AD8\u7EA7\u5C55\u793A",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u7C73\u6843",
          "hex": "#EAB490"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7C73\u9EC4",
          "hex": "#EADEB8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7C89",
          "hex": "#EEEAE7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u4EAE\u9EC4\u7EFF",
          "hex": "#A9EA71"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u68D5",
          "hex": "#594436"
        }
      ]
    },
    {
      "name": "\u7F8E\u5986\xB7\u8F7B\u8425\u9500\uFF08\u65B9\u6848 5\uFF09",
      "formula": "custom",
      "base_name": "\u871C\u6843",
      "base_hex": "#EA9F90",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u7F8E\u5986",
      "style_tags": [
        "\u67D4\u7126",
        "\u7CBE\u81F4",
        "\u4EB2\u548C",
        "\u7F8E\u5986",
        "\u8425\u9500",
        "\u6E10\u53D8"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u54C1\u724C\u5305\u88C5\u3001\u8BE6\u60C5\u9875\u3001\u67D4\u548C\u9AD8\u7EA7\u5C55\u793A",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u871C\u6843",
          "hex": "#EA9F90"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7C73\u8272",
          "hex": "#EAD3B8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u7070",
          "hex": "#E1D7D6"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u4EAE\u9EC4\u7EFF",
          "hex": "#C6EA71"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496",
          "hex": "#462F2B"
        }
      ]
    },
    {
      "name": "\u7F8E\u5986\xB7\u4E3B\u89C6\u89C9\uFF08\u65B9\u6848 1\uFF09",
      "formula": "custom",
      "base_name": "\u6843\u7C89",
      "base_hex": "#EA90AB",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u7F8E\u5986",
      "style_tags": [
        "\u67D4\u7126",
        "\u7CBE\u81F4",
        "\u4EB2\u548C",
        "\u7F8E\u5986",
        "\u4E3B\u89C6\u89C9",
        "\u6E10\u53D8"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u54C1\u724C\u5305\u88C5\u3001\u8BE6\u60C5\u9875\u3001\u67D4\u548C\u9AD8\u7EA7\u5C55\u793A",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6843\u7C89",
          "hex": "#EA90AB"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7C89\u7C73",
          "hex": "#EABCB8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7C89",
          "hex": "#EEE7E9"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u4EAE\u9EC4",
          "hex": "#EAD671"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496",
          "hex": "#462B33"
        }
      ]
    },
    {
      "name": "\u5E73\u9762\u6D77\u62A5\xB7\u6696\u5149\u611F\uFF08\u65B9\u6848 7\uFF09",
      "formula": "custom",
      "base_name": "\u6A58\u7EA2",
      "base_hex": "#E16847",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u5E73\u9762\u6D77\u62A5",
      "style_tags": [
        "\u51B2\u51FB",
        "\u620F\u5267\u6027",
        "\u5438\u775B",
        "\u6D77\u62A5",
        "\u6696\u5149",
        "\u6E10\u53D8"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u6D3B\u52A8\u6D77\u62A5\u3001\u89C6\u89C9 KV\u3001\u5BA3\u4F20\u9875\u51B2\u51FB\u8272",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6A58\u7EA2",
          "hex": "#E16847"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u91D1\u9EC4",
          "hex": "#DBB176"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7C89",
          "hex": "#EEE9E7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u4EAE\u9EC4\u7EFF",
          "hex": "#A1E425"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496",
          "hex": "#593E36"
        }
      ]
    },
    {
      "name": "\u5E73\u9762\u6D77\u62A5\xB7\u4E3B\u89C6\u89C9\uFF08\u65B9\u6848 1\uFF09",
      "formula": "custom",
      "base_name": "\u73AB\u7EA2",
      "base_hex": "#E14791",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u5E73\u9762\u6D77\u62A5",
      "style_tags": [
        "\u51B2\u51FB",
        "\u620F\u5267\u6027",
        "\u5438\u775B",
        "\u6D77\u62A5",
        "\u4E3B\u89C6\u89C9"
      ],
      "color_source": "custom",
      "hint": "\u9002\u5408\u6D3B\u52A8\u6D77\u62A5\u3001\u89C6\u89C9 KV\u3001\u5BA3\u4F20\u9875\u51B2\u51FB\u8272",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u73AB\u7EA2",
          "hex": "#E14791"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u810F\u7C89",
          "hex": "#DB7682"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7C89",
          "hex": "#EEE7EA"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u91D1\u9EC4",
          "hex": "#E4A125"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496\u7D2B",
          "hex": "#462B38"
        }
      ]
    },
    {
      "name": "\u8282\u65E5\xB7\u6625\u8282\u7EA2\u91D1\u7248",
      "formula": "custom",
      "base_name": "\u6731\u7802\u7EA2",
      "base_hex": "#E14A4A",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8282\u65E5\u9650\u5B9A",
      "style_tags": [
        "\u6625\u8282",
        "\u4F20\u7EDF",
        "\u7EA2\u91D1",
        "\u559C\u5E86",
        "\u8282\u65E5"
      ],
      "color_source": "custom",
      "hint": "\u6625\u8282\u6D3B\u52A8\u3001\u5E74\u8D27\u8282\u3001\u4F20\u7EDF\u8282\u5E86\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6731\u7802\u7EA2",
          "hex": "#E14A4A"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u91D1\u9EC4",
          "hex": "#E5B85A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7EA2",
          "hex": "#EEE7E7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6DF1\u9152\u7EA2",
          "hex": "#802D38"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u58A8\u9ED1",
          "hex": "#2B1F1F"
        }
      ]
    },
    {
      "name": "\u8282\u65E5\xB7\u5143\u5BB5\u82B1\u706F\u7248",
      "formula": "custom",
      "base_name": "\u6843\u7C89",
      "base_hex": "#E36E91",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8282\u65E5\u9650\u5B9A",
      "style_tags": [
        "\u6625\u8282",
        "\u5143\u5BB5",
        "\u82B1\u706F",
        "\u6696\u5149",
        "\u6E10\u53D8"
      ],
      "color_source": "custom",
      "hint": "\u5143\u5BB5\u8282\u3001\u82B1\u706F\u5C55\u3001\u706F\u8C1C\u4F1A\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6843\u7C89",
          "hex": "#E36E91"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6696\u9EC4",
          "hex": "#E5C25A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEE7E9"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6731\u7802",
          "hex": "#E14A4A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496",
          "hex": "#593236"
        }
      ]
    },
    {
      "name": "\u8282\u65E5\xB7\u7AEF\u5348\u827E\u7EFF\u7248",
      "formula": "custom",
      "base_name": "\u827E\u7EFF",
      "base_hex": "#6FA659",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8282\u65E5\u9650\u5B9A",
      "style_tags": [
        "\u7AEF\u5348",
        "\u827E\u8349",
        "\u4F20\u7EDF",
        "\u56FD\u98CE",
        "\u8282\u65E5"
      ],
      "color_source": "custom",
      "hint": "\u7AEF\u5348\u8282\u3001\u7CBD\u5B50\u5305\u88C5\u3001\u9F99\u821F\u8D5B\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u827E\u7EFF",
          "hex": "#6FA659"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u5AE9\u9EC4",
          "hex": "#D4D477"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7EFF",
          "hex": "#EEEEE7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6731\u7802",
          "hex": "#D13838"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u58A8\u7EFF",
          "hex": "#2E4A2E"
        }
      ]
    },
    {
      "name": "\u8282\u65E5\xB7\u4E2D\u79CB\u6708\u767D\u7248",
      "formula": "custom",
      "base_name": "\u6708\u767D",
      "base_hex": "#C8D6E0",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8282\u65E5\u9650\u5B9A",
      "style_tags": [
        "\u4E2D\u79CB",
        "\u6708\u767D",
        "\u96C5\u81F4",
        "\u7559\u767D",
        "\u8282\u65E5"
      ],
      "color_source": "custom",
      "hint": "\u4E2D\u79CB\u8282\u3001\u6708\u997C\u793C\u76D2\u3001\u56E2\u5706\u4E3B\u9898\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6708\u767D",
          "hex": "#C8D6E0"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6696\u9EC4",
          "hex": "#E5C287"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEEEEA"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6731\u7802",
          "hex": "#C73E45"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u9EDB\u84DD",
          "hex": "#3A4861"
        }
      ]
    },
    {
      "name": "\u8282\u65E5\xB7\u4E03\u5915\u661F\u7D2B\u7248",
      "formula": "custom",
      "base_name": "\u661F\u7D2B",
      "base_hex": "#8B5BB5",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8282\u65E5\u9650\u5B9A",
      "style_tags": [
        "\u4E03\u5915",
        "\u6D6A\u6F2B",
        "\u661F\u7A7A",
        "\u7D2B",
        "\u8282\u65E5"
      ],
      "color_source": "custom",
      "hint": "\u4E03\u5915\u3001\u60C5\u4EBA\u8282\u3001\u6D6A\u6F2B\u4E3B\u9898\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u661F\u7D2B",
          "hex": "#8B5BB5"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7C89\u7D2B",
          "hex": "#D49AC2"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEE7EE"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u4EAE\u91D1",
          "hex": "#E5C25A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u7D2B",
          "hex": "#3E2B5A"
        }
      ]
    },
    {
      "name": "\u6821\u56ED\xB7\u8FD0\u52A8\u4F1A\u7248\uFF08\u6A59\uFF09",
      "formula": "custom",
      "base_name": "\u6D3B\u529B\u6A59",
      "base_hex": "#E16847",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u6821\u56ED\u6D3B\u52A8",
      "style_tags": [
        "\u8FD0\u52A8",
        "\u6D3B\u529B",
        "\u6821\u56ED",
        "\u9633\u5149",
        "\u7ADE\u6280"
      ],
      "color_source": "custom",
      "hint": "\u6821\u56ED\u8FD0\u52A8\u4F1A\u3001\u7ADE\u6280\u6BD4\u8D5B\u3001\u9633\u5149\u4F53\u80B2\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6D3B\u529B\u6A59",
          "hex": "#E16847"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6696\u9EC4",
          "hex": "#E5C25A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEE9E7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u5929\u84DD",
          "hex": "#3EAAE0"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496",
          "hex": "#593E36"
        }
      ]
    },
    {
      "name": "\u6821\u56ED\xB7\u827A\u672F\u8282\u7248\uFF08\u7C89\u7D2B\uFF09",
      "formula": "custom",
      "base_name": "\u7C89\u7D2B",
      "base_hex": "#B86E96",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u6821\u56ED\u6D3B\u52A8",
      "style_tags": [
        "\u827A\u672F",
        "\u8282\u5E86",
        "\u7C89\u7D2B",
        "\u6587\u827A",
        "\u6821\u56ED"
      ],
      "color_source": "custom",
      "hint": "\u6821\u56ED\u827A\u672F\u8282\u3001\u6587\u827A\u6C47\u6F14\u3001\u624D\u827A\u5C55\u793A\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u7C89\u7D2B",
          "hex": "#B86E96"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u5AE9\u7EFF",
          "hex": "#8BDAB8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7D2B",
          "hex": "#EEE7ED"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u91D1\u9EC4",
          "hex": "#E5C25A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496\u7D2B",
          "hex": "#593E55"
        }
      ]
    },
    {
      "name": "\u6821\u56ED\xB7\u8BFB\u4E66\u4F1A\u7248\uFF08\u58A8\u7EFF\uFF09",
      "formula": "custom",
      "base_name": "\u58A8\u7EFF",
      "base_hex": "#3E5C45",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u6821\u56ED\u6D3B\u52A8",
      "style_tags": [
        "\u8BFB\u4E66",
        "\u77E5\u6027",
        "\u58A8\u7EFF",
        "\u6C89\u7A33",
        "\u6821\u56ED"
      ],
      "color_source": "custom",
      "hint": "\u6821\u56ED\u8BFB\u4E66\u4F1A\u3001\u9605\u8BFB\u6708\u3001\u4E66\u9999\u8282\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u58A8\u7EFF",
          "hex": "#3E5C45"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6696\u68D5",
          "hex": "#9D5A3A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7EFF",
          "hex": "#EEEEE7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u91D1\u9EC4",
          "hex": "#C29A3A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u58A8",
          "hex": "#2B3A2B"
        }
      ]
    },
    {
      "name": "\u6821\u56ED\xB7\u79D1\u6280\u8282\u7248\uFF08\u7535\u5149\u84DD\uFF09",
      "formula": "custom",
      "base_name": "\u7535\u5149\u84DD",
      "base_hex": "#3E5EE0",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u6821\u56ED\u6D3B\u52A8",
      "style_tags": [
        "\u79D1\u6280",
        "\u672A\u6765",
        "\u7535\u5149\u84DD",
        "\u9177\u70AB",
        "\u6821\u56ED"
      ],
      "color_source": "custom",
      "hint": "\u6821\u56ED\u79D1\u6280\u8282\u3001\u673A\u5668\u4EBA\u8D5B\u3001AI \u4E3B\u9898\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u7535\u5149\u84DD",
          "hex": "#3E5EE0"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7D2B\u7F57\u5170",
          "hex": "#8B5BB5"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6D45\u84DD\u7070",
          "hex": "#E0E5EE"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u4EAE\u9752",
          "hex": "#3EEEE0"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u84DD",
          "hex": "#2B3A5A"
        }
      ]
    },
    {
      "name": "\u6821\u56ED\xB7\u6BD5\u4E1A\u5B63\u7248\uFF08\u6DE1\u84DD\u7D2B\uFF09",
      "formula": "custom",
      "base_name": "\u6DE1\u84DD\u7D2B",
      "base_hex": "#8B9BD4",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u6821\u56ED\u6D3B\u52A8",
      "style_tags": [
        "\u6BD5\u4E1A",
        "\u6DE1\u84DD\u7D2B",
        "\u9752\u6625",
        "\u6587\u827A",
        "\u6821\u56ED"
      ],
      "color_source": "custom",
      "hint": "\u6BD5\u4E1A\u5B63\u3001\u6BD5\u4E1A\u5178\u793C\u3001\u9752\u6625\u7EAA\u5FF5\u518C\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6DE1\u84DD\u7D2B",
          "hex": "#8B9BD4"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6D45\u7C89",
          "hex": "#EABCB8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEE7EA"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u91D1\u9EC4",
          "hex": "#E5C25A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u84DD\u7D2B",
          "hex": "#4A5572"
        }
      ]
    },
    {
      "name": "\u6559\u57F9\xB7\u5C11\u513F\u7F16\u7A0B\u7248\uFF08\u9177\u9ED1\uFF09",
      "formula": "custom",
      "base_name": "\u9177\u9ED1",
      "base_hex": "#2B2B2B",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u57F9\u8BAD\u673A\u6784",
      "style_tags": [
        "\u7F16\u7A0B",
        "\u9177\u9ED1",
        "\u79D1\u6280",
        "\u6781\u5BA2",
        "\u6559\u57F9"
      ],
      "color_source": "custom",
      "hint": "\u5C11\u513F\u7F16\u7A0B\u3001\u4EE3\u7801\u6559\u80B2\u3001\u6781\u5BA2\u98CE\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u9177\u9ED1",
          "hex": "#2B2B2B"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7535\u5149\u84DD",
          "hex": "#3E5EE0"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6D45\u7070",
          "hex": "#D6D6D6"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u4EAE\u9752\u7EFF",
          "hex": "#3EE0B0"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u7070",
          "hex": "#1A1A1A"
        }
      ]
    },
    {
      "name": "\u6559\u57F9\xB7\u94A2\u7434\u7248\uFF08\u9ED1\u767D\u91D1\uFF09",
      "formula": "custom",
      "base_name": "\u94A2\u7434\u9ED1",
      "base_hex": "#1A1A1A",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u57F9\u8BAD\u673A\u6784",
      "style_tags": [
        "\u94A2\u7434",
        "\u9ED1\u767D",
        "\u4F18\u96C5",
        "\u7ECF\u5178",
        "\u6559\u57F9"
      ],
      "color_source": "custom",
      "hint": "\u94A2\u7434\u6559\u80B2\u3001\u97F3\u4E50\u5B66\u9662\u3001\u53E4\u5178\u4E50\u5668\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u94A2\u7434\u9ED1",
          "hex": "#1A1A1A"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u9999\u69DF\u91D1",
          "hex": "#C29A6A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#E8E4DC"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u9152\u7EA2",
          "hex": "#802D38"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6696\u7070",
          "hex": "#6A6662"
        }
      ]
    },
    {
      "name": "\u6559\u57F9\xB7\u821E\u8E48\u7248\uFF08\u7C89\u80A4\uFF09",
      "formula": "custom",
      "base_name": "\u7C89\u80A4",
      "base_hex": "#EAB49D",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u57F9\u8BAD\u673A\u6784",
      "style_tags": [
        "\u821E\u8E48",
        "\u7C89\u80A4",
        "\u67D4\u7F8E",
        "\u4F18\u96C5",
        "\u6559\u57F9"
      ],
      "color_source": "custom",
      "hint": "\u821E\u8E48\u6559\u80B2\u3001\u5F62\u4F53\u8BFE\u3001\u82AD\u857E/\u4E2D\u56FD\u821E\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u7C89\u80A4",
          "hex": "#EAB49D"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6DE1\u7C89",
          "hex": "#EBC8B8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7C89",
          "hex": "#EEE7E9"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u73AB\u7470\u91D1",
          "hex": "#C2886A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496",
          "hex": "#593434"
        }
      ]
    },
    {
      "name": "\u6559\u57F9\xB7\u7F8E\u672F\u7248\uFF08\u989C\u6599\u5F69\uFF09",
      "formula": "custom",
      "base_name": "\u989C\u6599\u7EA2",
      "base_hex": "#D13838",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u57F9\u8BAD\u673A\u6784",
      "style_tags": [
        "\u7F8E\u672F",
        "\u989C\u6599",
        "\u7AE5\u8DA3",
        "\u521B\u4F5C",
        "\u6559\u57F9"
      ],
      "color_source": "custom",
      "hint": "\u5C11\u513F\u7F8E\u672F\u3001\u521B\u610F\u7ED8\u753B\u3001\u827A\u672F\u542F\u8499\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u989C\u6599\u7EA2",
          "hex": "#D13838"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u94B4\u84DD",
          "hex": "#3E5EE0"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEE9E7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u67E0\u6AAC\u9EC4",
          "hex": "#EAD61A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u70AD",
          "hex": "#2B2620"
        }
      ]
    },
    {
      "name": "\u6559\u57F9\xB7\u53E3\u624D\u7248\uFF08\u6F14\u8BB2\u7EA2\uFF09",
      "formula": "custom",
      "base_name": "\u6F14\u8BB2\u7EA2",
      "base_hex": "#C73E45",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u57F9\u8BAD\u673A\u6784",
      "style_tags": [
        "\u53E3\u624D",
        "\u6F14\u8BB2",
        "\u7EA2",
        "\u81EA\u4FE1",
        "\u6559\u57F9"
      ],
      "color_source": "custom",
      "hint": "\u53E3\u624D\u57F9\u8BAD\u3001\u6F14\u8BB2\u8BFE\u3001\u6717\u8BF5\u73ED\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6F14\u8BB2\u7EA2",
          "hex": "#C73E45"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6696\u9EC4",
          "hex": "#E5B85A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEE7E7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6DF1\u84DD",
          "hex": "#2B4A7A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u58A8\u9ED1",
          "hex": "#2B1F1F"
        }
      ]
    },
    {
      "name": "\u6559\u57F9\xB7\u4E66\u6CD5\u7248\uFF08\u58A8\u9999\uFF09",
      "formula": "custom",
      "base_name": "\u58A8\u9999",
      "base_hex": "#2B2620",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u57F9\u8BAD\u673A\u6784",
      "style_tags": [
        "\u4E66\u6CD5",
        "\u58A8\u9999",
        "\u56FD\u98CE",
        "\u5370\u7AE0",
        "\u6559\u57F9"
      ],
      "color_source": "custom",
      "hint": "\u4E66\u6CD5\u57F9\u8BAD\u3001\u56F4\u68CB/\u56FD\u753B\u3001\u6BDB\u7B14\u5B57\u8BFE\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u58A8\u9999",
          "hex": "#2B2620"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u5370\u6CE5\u7EA2",
          "hex": "#C73E45"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEE9E7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u91D1\u7B94",
          "hex": "#C29A6A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DE1\u58A8\u7070",
          "hex": "#6A6662"
        }
      ]
    },
    {
      "name": "\u4EB2\u5B50\xB7\u5E7C\u513F\u56ED\u7248\uFF08\u5976\u9EC4\uFF09",
      "formula": "custom",
      "base_name": "\u5976\u9EC4",
      "base_hex": "#EAD390",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u4EB2\u5B50",
      "style_tags": [
        "\u5E7C\u513F",
        "\u5976\u9EC4",
        "\u7AE5\u8DA3",
        "\u6E29\u6696",
        "\u4EB2\u5B50"
      ],
      "color_source": "custom",
      "hint": "\u5E7C\u513F\u56ED\u62DB\u751F\u3001\u4EB2\u5B50\u65E9\u6559\u3001\u6E29\u6696\u7AE5\u8DA3\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u5976\u9EC4",
          "hex": "#EAD390"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u5AE9\u7C89",
          "hex": "#EABCB8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEEAE7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u8584\u8377\u7EFF",
          "hex": "#5EDEB3"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6696\u68D5",
          "hex": "#9D5A3A"
        }
      ]
    },
    {
      "name": "\u4EB2\u5B50\xB7\u7ED8\u672C\u7248\uFF08\u7CD6\u679C\u7C89\uFF09",
      "formula": "custom",
      "base_name": "\u7CD6\u679C\u7C89",
      "base_hex": "#EA90AB",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u4EB2\u5B50",
      "style_tags": [
        "\u7ED8\u672C",
        "\u7CD6\u679C\u7C89",
        "\u7AE5\u8DA3",
        "\u60F3\u8C61",
        "\u4EB2\u5B50"
      ],
      "color_source": "custom",
      "hint": "\u513F\u7AE5\u7ED8\u672C\u3001\u7AE5\u4E66\u51FA\u7248\u3001\u4EB2\u5B50\u9605\u8BFB\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u7CD6\u679C\u7C89",
          "hex": "#EA90AB"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6DE1\u84DD",
          "hex": "#8BBCDA"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D\u5E26\u7C89",
          "hex": "#EEE7E9"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u67E0\u6AAC\u9EC4",
          "hex": "#EAD61A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496",
          "hex": "#593434"
        }
      ]
    },
    {
      "name": "\u4EB2\u5B50\xB7\u73A9\u5177\u7248\uFF08\u73A9\u5177\u84DD\uFF09",
      "formula": "custom",
      "base_name": "\u73A9\u5177\u84DD",
      "base_hex": "#5EDCDE",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u4EB2\u5B50",
      "style_tags": [
        "\u73A9\u5177",
        "\u84DD",
        "\u7AE5\u8DA3",
        "\u6D3B\u6CFC",
        "\u4EB2\u5B50"
      ],
      "color_source": "custom",
      "hint": "\u513F\u7AE5\u73A9\u5177\u3001\u79EF\u6728\u62FC\u642D\u3001\u4EB2\u5B50\u73A9\u5177\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u73A9\u5177\u84DD",
          "hex": "#5EDCDE"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u67E0\u6AAC\u9EC4",
          "hex": "#EAD671"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#E7EEEE"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u73CA\u745A\u7EA2",
          "hex": "#EA7361"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u84DD\u7070",
          "hex": "#304F4F"
        }
      ]
    },
    {
      "name": "\u4EB2\u5B50\xB7\u65E9\u6559\u7248\uFF08\u67D4\u7EFF\uFF09",
      "formula": "custom",
      "base_name": "\u67D4\u7EFF",
      "base_hex": "#A8D4A0",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u4EB2\u5B50",
      "style_tags": [
        "\u65E9\u6559",
        "\u67D4\u7EFF",
        "\u81EA\u7136",
        "\u6210\u957F",
        "\u4EB2\u5B50"
      ],
      "color_source": "custom",
      "hint": "\u4EB2\u5B50\u65E9\u6559\u3001\u611F\u7EDF\u8BAD\u7EC3\u3001\u81EA\u7136\u6210\u957F\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u67D4\u7EFF",
          "hex": "#A8D4A0"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6D45\u9EC4",
          "hex": "#EADEB8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEEEE7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6D45\u7C89",
          "hex": "#EABCB8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u7EFF",
          "hex": "#4A6643"
        }
      ]
    },
    {
      "name": "\u4EB2\u5B50\xB7\u4EB2\u5B50\u88C5\u7248\uFF08\u6696\u7C73\uFF09",
      "formula": "custom",
      "base_name": "\u6696\u7C73",
      "base_hex": "#E8DCC0",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u4EB2\u5B50",
      "style_tags": [
        "\u4EB2\u5B50\u88C5",
        "\u6696\u7C73",
        "\u7B80\u7EA6",
        "\u5BB6\u5EAD",
        "\u4EB2\u5B50"
      ],
      "color_source": "custom",
      "hint": "\u4EB2\u5B50\u88C5\u3001\u5BB6\u5EAD\u88C5\u3001\u7B80\u7EA6\u65E5\u5F0F\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6696\u7C73",
          "hex": "#E8DCC0"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6D45\u7C89",
          "hex": "#EAB49D"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEE9E7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u62B9\u8336\u7EFF",
          "hex": "#6FA659"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6696\u7070",
          "hex": "#6A6662"
        }
      ]
    },
    {
      "name": "\u4EB2\u5B50\xB7\u6444\u5F71\u7248\uFF08\u6696\u8C03\uFF09",
      "formula": "custom",
      "base_name": "\u6696\u8C03",
      "base_hex": "#EAB490",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u4EB2\u5B50",
      "style_tags": [
        "\u6444\u5F71",
        "\u6696\u8C03",
        "\u6E29\u99A8",
        "\u590D\u53E4",
        "\u4EB2\u5B50"
      ],
      "color_source": "custom",
      "hint": "\u4EB2\u5B50\u6444\u5F71\u3001\u5168\u5BB6\u798F\u3001\u6E29\u99A8\u590D\u53E4\u89C6\u89C9",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6696\u8C03",
          "hex": "#EAB490"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6D45\u7C73\u9EC4",
          "hex": "#EADEB8"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEE7E7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u7816\u7EA2",
          "hex": "#9D4A3A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u5496",
          "hex": "#593434"
        }
      ]
    },
    {
      "name": "\u8282\u6C14\xB7\u6E05\u660E",
      "formula": "custom",
      "base_name": "\u96E8\u524D",
      "base_hex": "#5A8270",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8282\u6C14\u9650\u5B9A",
      "style_tags": [
        "\u8282\u6C14",
        "\u6E05\u660E",
        "\u9752\u7EFF",
        "\u6E05\u51B7",
        "\u4F20\u7EDF"
      ],
      "color_source": "custom",
      "hint": "\u6E05\u660E\u8FFD\u601D\u3001\u96E8\u524D\u6E05\u51B7\u3001\u9752\u7EFF\u7D20\u96C5",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u96E8\u524D",
          "hex": "#5A8270"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u67F3\u7EFF",
          "hex": "#A8C5A0"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#ECE9E0"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u8FDC\u5C71\u9752",
          "hex": "#2F4F4F"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u7070",
          "hex": "#4A4A4A"
        }
      ]
    },
    {
      "name": "\u8282\u6C14\xB7\u8C37\u96E8",
      "formula": "custom",
      "base_name": "\u8C37\u8272",
      "base_hex": "#D4A93C",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8282\u6C14\u9650\u5B9A",
      "style_tags": [
        "\u8282\u6C14",
        "\u8C37\u96E8",
        "\u91D1\u9EC4",
        "\u751F\u673A",
        "\u6E29\u6696"
      ],
      "color_source": "custom",
      "hint": "\u8C37\u96E8\u751F\u767E\u8C37\u3001\u6E29\u6696\u91D1\u9EC4\u3001\u751F\u673A\u52C3\u52C3",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u8C37\u8272",
          "hex": "#D4A93C"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u5AE9\u7EFF",
          "hex": "#BDDD22"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u8336\u8272",
          "hex": "#B5996A"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u843D\u9EC4",
          "hex": "#C99B3D"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u8910",
          "hex": "#5C4A2E"
        }
      ]
    },
    {
      "name": "\u8282\u6C14\xB7\u590F\u81F3",
      "formula": "custom",
      "base_name": "\u8377\u7C89",
      "base_hex": "#F2B5C0",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8282\u6C14\u9650\u5B9A",
      "style_tags": [
        "\u8282\u6C14",
        "\u590F\u81F3",
        "\u8377\u5858",
        "\u7C89\u7EFF\u649E\u8272",
        "\u6E05\u723D"
      ],
      "color_source": "custom",
      "hint": "\u590F\u81F3\u8377\u5858\u3001\u7C89\u7EFF\u649E\u8272\u3001\u6E05\u723D\u590F\u65E5",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u8377\u7C89",
          "hex": "#F2B5C0"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7FE0\u7EFF",
          "hex": "#2D8C5C"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#F2E5D0"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u85D5\u8910",
          "hex": "#7A4A4A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u58A8\u7EFF",
          "hex": "#1F4D2E"
        }
      ]
    },
    {
      "name": "\u8282\u6C14\xB7\u7ACB\u79CB",
      "formula": "custom",
      "base_name": "\u68A7\u6850",
      "base_hex": "#C97A3D",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8282\u6C14\u9650\u5B9A",
      "style_tags": [
        "\u8282\u6C14",
        "\u7ACB\u79CB",
        "\u68A7\u6850",
        "\u91D1\u6A59",
        "\u843D\u53F6"
      ],
      "color_source": "custom",
      "hint": "\u7ACB\u79CB\u68A7\u6850\u3001\u91D1\u6A59\u6E29\u6696\u3001\u843D\u53F6\u91D1\u79CB",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u68A7\u6850",
          "hex": "#C97A3D"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u91D1\u9EC4",
          "hex": "#E8B33A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEDFC2"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u67A3\u7EA2",
          "hex": "#8C3A1F"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u68D5",
          "hex": "#5C3A24"
        }
      ]
    },
    {
      "name": "\u8282\u6C14\xB7\u51AC\u81F3",
      "formula": "custom",
      "base_name": "\u6696\u9633",
      "base_hex": "#B83A1F",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u8282\u6C14\u9650\u5B9A",
      "style_tags": [
        "\u8282\u6C14",
        "\u51AC\u81F3",
        "\u6696\u9633",
        "\u7EA2\u91D1",
        "\u5C81\u672B"
      ],
      "color_source": "custom",
      "hint": "\u51AC\u81F3\u6696\u9633\u3001\u7EA2\u91D1\u6E29\u6696\u3001\u5C81\u672B\u56E2\u5706",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6696\u9633",
          "hex": "#B83A1F"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u91D1\u9EC4",
          "hex": "#E0A82E"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6696\u767D",
          "hex": "#F2E5D2"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6DF1\u5496",
          "hex": "#4A2C1F"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6697\u7EA2",
          "hex": "#7A1F1F"
        }
      ]
    },
    {
      "name": "\u6821\u56ED\xB7\u8FCE\u65B0\u665A\u4F1A",
      "formula": "custom",
      "base_name": "\u8FCE\u65B0\u7EA2",
      "base_hex": "#C8252C",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u6821\u56ED\u6D3B\u52A8",
      "style_tags": [
        "\u8FCE\u65B0",
        "\u665A\u4F1A",
        "\u7EA2\u91D1",
        "\u559C\u5E86",
        "\u6821\u56ED"
      ],
      "color_source": "custom",
      "hint": "\u8FCE\u65B0\u665A\u4F1A\u3001\u65B0\u751F\u6B22\u8FCE\u3001\u7EA2\u91D1\u559C\u5E86",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u8FCE\u65B0\u7EA2",
          "hex": "#C8252C"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u91D1\u9EC4",
          "hex": "#E5B65A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#EEE7E7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u85CF\u84DD",
          "hex": "#1F2A5C"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u58A8\u9ED1",
          "hex": "#2B1F1F"
        }
      ]
    },
    {
      "name": "\u6821\u56ED\xB7\u519B\u8BAD",
      "formula": "custom",
      "base_name": "\u519B\u7EFF",
      "base_hex": "#5C7548",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u6821\u56ED\u6D3B\u52A8",
      "style_tags": [
        "\u519B\u8BAD",
        "\u519B\u7EFF",
        "\u5361\u5176",
        "\u9633\u521A",
        "\u575A\u6BC5"
      ],
      "color_source": "custom",
      "hint": "\u519B\u8BAD\u3001\u519B\u7EFF\u5361\u5176\u3001\u9633\u521A\u575A\u6BC5",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u519B\u7EFF",
          "hex": "#5C7548"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u5361\u5176",
          "hex": "#B59F6A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#ECE6D8"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6DF1\u68D5",
          "hex": "#4A3A24"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u85CF\u9752",
          "hex": "#2A2A4A"
        }
      ]
    },
    {
      "name": "\u6821\u56ED\xB7\u73ED\u670D",
      "formula": "custom",
      "base_name": "\u85CF\u84DD",
      "base_hex": "#1F3A5C",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u6821\u56ED\u6D3B\u52A8",
      "style_tags": [
        "\u73ED\u670D",
        "\u85CF\u84DD",
        "\u767D",
        "\u9752\u6625",
        "\u6D3B\u529B"
      ],
      "color_source": "custom",
      "hint": "\u73ED\u670D\u5B9A\u5236\u3001\u85CF\u84DD\u767D\u7EA2\u3001\u9752\u6625\u6D3B\u529B",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u85CF\u84DD",
          "hex": "#1F3A5C"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u767D",
          "hex": "#F4F4F4"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6D45\u7070",
          "hex": "#B0B5BD"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u73ED\u7EA2",
          "hex": "#C8252C"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u7070",
          "hex": "#3A3A3A"
        }
      ]
    },
    {
      "name": "\u6821\u56ED\xB7\u5143\u65E6",
      "formula": "custom",
      "base_name": "\u5143\u65E6\u7EA2",
      "base_hex": "#C8252C",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u6821\u56ED\u6D3B\u52A8",
      "style_tags": [
        "\u5143\u65E6",
        "\u665A\u4F1A",
        "\u91D1\u7EA2\u767D",
        "\u65B0\u5E74",
        "\u559C\u5E86"
      ],
      "color_source": "custom",
      "hint": "\u5143\u65E6\u665A\u4F1A\u3001\u91D1\u7EA2\u767D\u559C\u5E86\u3001\u65B0\u5E74\u65B0\u6C14\u8C61",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u5143\u65E6\u7EA2",
          "hex": "#C8252C"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u91D1\u8272",
          "hex": "#E5B65A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7C73\u767D",
          "hex": "#F4EFE7"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6DF1\u84DD",
          "hex": "#1F3A5C"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u58A8\u9ED1",
          "hex": "#1F1F1F"
        }
      ]
    },
    {
      "name": "\u6559\u57F9\xB7\u56F4\u68CB",
      "formula": "custom",
      "base_name": "\u58A8\u9ED1",
      "base_hex": "#1A1A1A",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u57F9\u8BAD\u673A\u6784",
      "style_tags": [
        "\u56F4\u68CB",
        "\u9ED1\u767D\u7070",
        "\u6781\u7B80",
        "\u4E1C\u65B9",
        "\u7985\u610F"
      ],
      "color_source": "custom",
      "hint": "\u56F4\u68CB\u57F9\u8BAD\u3001\u9ED1\u767D\u7070\u6781\u7B80\u3001\u4E1C\u65B9\u7985\u610F",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u58A8\u9ED1",
          "hex": "#1A1A1A"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u68CB\u5B50\u767D",
          "hex": "#F2F2F2"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u68CB\u76D8\u6728",
          "hex": "#B5996A"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u6731\u5370\u7EA2",
          "hex": "#C8252C"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7070",
          "hex": "#4A4A4A"
        }
      ]
    },
    {
      "name": "\u6559\u57F9\xB7\u6570\u5B66\u601D\u7EF4",
      "formula": "custom",
      "base_name": "\u6DF1\u84DD",
      "base_hex": "#1F3A7C",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u57F9\u8BAD\u673A\u6784",
      "style_tags": [
        "\u6570\u5B66",
        "\u601D\u7EF4",
        "\u6DF1\u84DD",
        "\u6A59",
        "\u903B\u8F91"
      ],
      "color_source": "custom",
      "hint": "\u6570\u5B66\u601D\u7EF4\u3001\u6DF1\u84DD\u6A59\u649E\u8272\u3001\u903B\u8F91\u7406\u6027",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u6DF1\u84DD",
          "hex": "#1F3A7C"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u6A59",
          "hex": "#E8924A"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u767D",
          "hex": "#F8F8F8"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u9EC4",
          "hex": "#F2CE2B"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u7070",
          "hex": "#5C5C5C"
        }
      ]
    },
    {
      "name": "\u6559\u57F9\xB7\u82F1\u8BED\u542F\u8499",
      "formula": "custom",
      "base_name": "\u82F1\u4F26\u7EA2",
      "base_hex": "#C8252C",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u57F9\u8BAD\u673A\u6784",
      "style_tags": [
        "\u82F1\u8BED",
        "\u542F\u8499",
        "\u5F69\u8679",
        "\u82F1\u4F26",
        "\u6D3B\u6CFC"
      ],
      "color_source": "custom",
      "hint": "\u82F1\u8BED\u542F\u8499\u3001\u5F69\u8679\u914D\u8272\u3001\u82F1\u4F26\u6D3B\u6CFC",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u82F1\u4F26\u7EA2",
          "hex": "#C8252C"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u82F1\u4F26\u84DD",
          "hex": "#1F4A8C"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u5976\u767D",
          "hex": "#F8F4E8"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u4EAE\u9EC4",
          "hex": "#F2CE2B"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u68EE\u6797\u7EFF",
          "hex": "#2C7C4A"
        }
      ]
    },
    {
      "name": "\u6559\u57F9\xB7\u79D1\u5B66\u5B9E\u9A8C",
      "formula": "custom",
      "base_name": "\u5B9E\u9A8C\u7D2B",
      "base_hex": "#6A1F9C",
      "scene_type": "\u54C1\u724C\u5B9A\u5236-\u57F9\u8BAD\u673A\u6784",
      "style_tags": [
        "\u79D1\u5B66",
        "\u5B9E\u9A8C",
        "\u7D2B\u84DD",
        "\u8367\u5149",
        "\u79D1\u6280"
      ],
      "color_source": "custom",
      "hint": "\u79D1\u5B66\u5B9E\u9A8C\u3001\u7D2B\u84DD\u8367\u5149\u3001\u79D1\u6280\u672A\u6765\u611F",
      "palette": [
        {
          "role": "\u4E3B\u8272",
          "name_zh": "\u5B9E\u9A8C\u7D2B",
          "hex": "#6A1F9C"
        },
        {
          "role": "\u8F85\u52A9\u8272",
          "name_zh": "\u7535\u5149\u84DD",
          "hex": "#1F8CFF"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u767D",
          "hex": "#F2F2F2"
        },
        {
          "role": "\u70B9\u7F00\u8272",
          "name_zh": "\u8367\u5149\u7EFF",
          "hex": "#2CE05C"
        },
        {
          "role": "\u4E2D\u6027\u8272",
          "name_zh": "\u6DF1\u7070",
          "hex": "#2B2B2B"
        }
      ]
    }
  ],
  "scene_types": [
    "\u54C1\u724C\u5B9A\u5236-\u4EB2\u5B50",
    "\u54C1\u724C\u5B9A\u5236-\u513F\u7AE5",
    "\u54C1\u724C\u5B9A\u5236-\u56FD\u98CE",
    "\u54C1\u724C\u5B9A\u5236-\u57F9\u8BAD\u673A\u6784",
    "\u54C1\u724C\u5B9A\u5236-\u5E73\u9762\u6D77\u62A5",
    "\u54C1\u724C\u5B9A\u5236-\u6821\u56ED\u6D3B\u52A8",
    "\u54C1\u724C\u5B9A\u5236-\u7F8E\u5986",
    "\u54C1\u724C\u5B9A\u5236-\u8282\u65E5\u9650\u5B9A",
    "\u54C1\u724C\u5B9A\u5236-\u8282\u6C14\u9650\u5B9A",
    "\u54C1\u724C\u5B9A\u5236-\u8F7B\u5962",
    "\u56FD\u9645-\u548C\u670D\u79C0",
    "\u56FD\u9645-\u592A\u9F13",
    "\u56FD\u9645-\u6D6E\u4E16\u7ED8",
    "\u56FD\u9645-\u80FD\u5267",
    "\u56FD\u9645-\u8336\u9053",
    "\u6821\u56ED-\u4F20\u7EDF\u8282\u65E5",
    "\u6821\u56ED-\u513F\u7AE5\u8282\u76EE",
    "\u6821\u56ED-\u5178\u793C",
    "\u6821\u56ED-\u5408\u5531",
    "\u6821\u56ED-\u620F\u5267",
    "\u6821\u56ED-\u6717\u8BF5",
    "\u6821\u56ED-\u821E\u8E48",
    "\u6821\u56ED-\u8BFE\u672C\u5267",
    "\u897F\u65B9\u8282\u65E5-\u4E07\u5723",
    "\u897F\u65B9\u8282\u65E5-\u5723\u8BDE",
    "\u897F\u65B9\u8282\u65E5-\u5A5A\u793C",
    "\u897F\u65B9\u8282\u65E5-\u611F\u6069",
    "\u897F\u65B9\u8282\u65E5-\u751F\u65E5"
  ],
  "style_tags": [
    "\u4E03\u5915",
    "\u4E07\u5723\u8282",
    "\u4E09\u89D2\u7C89\u5F69",
    "\u4E09\u89D2\u914D\u8272",
    "\u4E1C\u65B9",
    "\u4E2D\u79CB",
    "\u4E3B\u89C6\u89C9",
    "\u4E66\u6CD5",
    "\u4EB2\u548C",
    "\u4EB2\u5B50",
    "\u4EB2\u5B50\u88C5",
    "\u4F18\u96C5",
    "\u4F20\u7EDF",
    "\u4F20\u7EDF\u8282\u65E5",
    "\u513F\u7AE5",
    "\u513F\u7AE5\u751F\u65E5",
    "\u5143\u5BB5",
    "\u5143\u65E6",
    "\u514B\u5236",
    "\u519B\u7EFF",
    "\u519B\u8BAD",
    "\u51AC\u81F3",
    "\u51B2\u51FB",
    "\u521B\u4F5C",
    "\u529B\u91CF",
    "\u5305\u88C5",
    "\u5355\u8272\u6DF1\u6D45",
    "\u5361\u5176",
    "\u5370\u7AE0",
    "\u53E3\u624D",
    "\u53E4\u5178",
    "\u542F\u8499",
    "\u5438\u775B",
    "\u548C\u98CE",
    "\u54C1\u724C",
    "\u54C1\u724C\u9875",
    "\u559C\u5E86",
    "\u56F4\u68CB",
    "\u56FD\u98CE",
    "\u571F\u8272",
    "\u5723\u6D01",
    "\u5723\u8BDE\u8282",
    "\u575A\u6BC5",
    "\u58A8\u7EFF",
    "\u58A8\u9999",
    "\u590D\u53E4",
    "\u590F\u81F3",
    "\u591A\u89D2\u8272",
    "\u592A\u9F13",
    "\u5976\u9EC4",
    "\u5A5A\u793C",
    "\u5B89\u9759",
    "\u5B9E\u9A8C",
    "\u5BB6\u5EAD",
    "\u5BF9\u6BD4\u9002\u4E2D",
    "\u5C11\u5973",
    "\u5C81\u672B",
    "\u5E7C\u513F",
    "\u5E84\u91CD",
    "\u5F3A\u5BF9\u6BD4",
    "\u5F69\u8679",
    "\u601D\u7EF4",
    "\u60B2\u5267",
    "\u60F3\u8C61",
    "\u611F\u6069\u8282",
    "\u620F\u5267\u6027",
    "\u6210\u957F",
    "\u6292\u60C5",
    "\u6444\u5F71",
    "\u6559\u57F9",
    "\u6570\u5B66",
    "\u6587\u521B",
    "\u6587\u827A",
    "\u65B0\u5E74",
    "\u65E9\u6559",
    "\u660E\u4EAE",
    "\u660E\u5FEB",
    "\u661F\u7A7A",
    "\u6625\u8282",
    "\u665A\u4F1A",
    "\u6696\u5149",
    "\u6696\u7C73",
    "\u6696\u8C03",
    "\u6696\u9633",
    "\u6697\u7D2B",
    "\u6708\u767D",
    "\u672A\u6765",
    "\u6781\u5BA2",
    "\u6781\u7B80",
    "\u67D4\u7126",
    "\u67D4\u7EFF",
    "\u67D4\u7F8E",
    "\u6821\u56ED",
    "\u68A7\u6850",
    "\u68D5\u8272\u6E10\u53D8",
    "\u6A44\u6984\u7EFF\u6E10\u53D8",
    "\u6A59",
    "\u6A59\u7D2B\u9ED1",
    "\u6B22\u5FEB",
    "\u6BD5\u4E1A",
    "\u6C11\u65CF",
    "\u6C5F\u6237",
    "\u6C89\u7A33",
    "\u6C89\u91CD",
    "\u6D3B\u529B",
    "\u6D3B\u6CFC",
    "\u6D6A\u6F2B",
    "\u6D6E\u4E16\u7ED8",
    "\u6D77\u62A5",
    "\u6DE1\u84DD\u7D2B",
    "\u6DE1\u96C5",
    "\u6DF1\u84DD",
    "\u6E05\u51B7",
    "\u6E05\u660E",
    "\u6E05\u723D",
    "\u6E10\u53D8",
    "\u6E29\u6696",
    "\u6E29\u99A8",
    "\u6F14\u8BB2",
    "\u6FC0\u6602",
    "\u7231\u56FD",
    "\u73A9\u5177",
    "\u73ED\u670D",
    "\u751F\u673A",
    "\u7535\u5149\u84DD",
    "\u7559\u767D",
    "\u767D",
    "\u767D\u91D1",
    "\u77E5\u6027",
    "\u795E\u79D8",
    "\u7985\u610F",
    "\u79D1\u5B66",
    "\u79D1\u6280",
    "\u7ACB\u79CB",
    "\u7ADE\u6280",
    "\u7AE5\u8DA3",
    "\u7AEF\u5348",
    "\u7B80\u7EA6",
    "\u7C7B\u4F3C\u8272",
    "\u7C7B\u4F3C\u8272\u6E10\u53D8",
    "\u7C89\u5AE9",
    "\u7C89\u7D2B",
    "\u7C89\u7D2B\u6E10\u53D8",
    "\u7C89\u7EFF\u649E\u8272",
    "\u7C89\u80A4",
    "\u7C89\u84DD",
    "\u7CBE\u81F4",
    "\u7CD6\u679C\u7C89",
    "\u7D20\u96C5",
    "\u7D2B",
    "\u7D2B\u84DD",
    "\u7EA2",
    "\u7EA2\u6B4C",
    "\u7EA2\u7EFF\u649E\u8272",
    "\u7EA2\u84DD\u649E\u8272",
    "\u7EA2\u91D1",
    "\u7ECF\u5178",
    "\u7ED8\u672C",
    "\u7EDF\u4E00",
    "\u7F16\u7A0B",
    "\u7F8E\u5986",
    "\u7F8E\u672F",
    "\u80FD\u5267",
    "\u81EA\u4FE1",
    "\u81EA\u7136",
    "\u821E\u53F0\u611F",
    "\u821E\u53F0\u7126\u70B9",
    "\u821E\u8E48",
    "\u827A\u672F",
    "\u827E\u8349",
    "\u8282\u5E86",
    "\u8282\u65E5",
    "\u8282\u6C14",
    "\u82B1\u706F",
    "\u82F1\u4F26",
    "\u82F1\u8BED",
    "\u8336\u9053",
    "\u8367\u5149",
    "\u8377\u5858",
    "\u8425\u9500",
    "\u843D\u53F6",
    "\u84DD",
    "\u84DD\u7070\u6DF1\u6D45",
    "\u84DD\u7EA2\u649E\u8272",
    "\u84DD\u8272",
    "\u85CF\u84DD",
    "\u897F\u65B9\u8282\u65E5",
    "\u8BE1\u5F02",
    "\u8BFB\u4E66",
    "\u8BFE\u672C\u5267",
    "\u8C37\u96E8",
    "\u8D28\u611F",
    "\u8F7B\u5962",
    "\u8FCE\u65B0",
    "\u8FD0\u52A8",
    "\u903B\u8F91",
    "\u9177\u70AB",
    "\u9177\u9ED1",
    "\u91D1\u6A59",
    "\u91D1\u7EA2\u767D",
    "\u91D1\u9EC4",
    "\u94A2\u7434",
    "\u9633\u5149",
    "\u9633\u521A",
    "\u96C5\u81F4",
    "\u9752\u6625",
    "\u9752\u7EFF",
    "\u989C\u6599",
    "\u9AD8\u7EA7",
    "\u9ED1\u767D",
    "\u9ED1\u767D\u7070",
    "\u9F13\u70B9"
  ],
  "color_sources": [
    "custom",
    "\u534E\u8272",
    "\u548C\u8272",
    "\u6D0B\u8272"
  ]
};

// supabase/functions/_shared/palette-library.ts
var PALETTE_COLORS = PALETTE_DATA.colors;
var PROGRAM_PRESETS = PALETTE_DATA.presets;
var PALETTE_FORMULAS = PALETTE_DATA.formulas;
var PALETTE_SCENE_TYPES = PALETTE_DATA.scene_types;
var PALETTE_STYLE_TAGS = PALETTE_DATA.style_tags;
var PALETTE_COLOR_SOURCES = PALETTE_DATA.color_sources;
var PALETTE_DISCLAIMER = PALETTE_DATA.disclaimer;
var PALETTE_VERSION = PALETTE_DATA.version;
var PROGRAM_KEYWORDS = {
  \u6717\u8BF5: ["\u6717\u8BF5", "recitation", "\u8BD7", "\u6F14\u8BB2"],
  \u5408\u5531: ["\u5408\u5531", "chorus"],
  \u821E\u8E48: ["\u7FA4\u821E", "\u821E\u8E48", "dance", "\u827A\u672F\u8282"],
  \u620F\u5267: ["\u620F\u5267", "\u8BFE\u672C\u5267", "\u60C5\u666F\u5267", "drama"],
  \u5566\u5566: ["\u5566\u5566", "cheer"],
  \u5668\u4E50: ["\u5668\u4E50", "\u7BA1\u5F26", "\u4E50\u5668", "instrument", "orchestra"]
};
function retrievePresets(programType, themeKeywords = "", topN = 3) {
  const t = (programType || "").toLowerCase();
  const kw = (themeKeywords || "").toLowerCase();
  const scored = PROGRAM_PRESETS.map((preset) => {
    let score = 0;
    for (const [tag, words] of Object.entries(PROGRAM_KEYWORDS)) {
      const typeHit = t.includes(tag.toLowerCase()) || words.some((w) => t.includes(w.toLowerCase()));
      if (!typeHit) continue;
      if (preset.scene_type.includes(tag)) score += 5;
      if (preset.name.toLowerCase().includes(tag.toLowerCase())) score += 3;
      if (preset.style_tags.some((s) => words.some((w) => s.toLowerCase().includes(w.toLowerCase())))) score += 2;
    }
    if (kw) {
      for (const token of kw.split(/[\s,、,/]+/).filter(Boolean)) {
        if (preset.name.toLowerCase().includes(token)) score += 4;
        if (preset.hint.toLowerCase().includes(token)) score += 2;
        if (preset.style_tags.some((s) => s.toLowerCase().includes(token))) score += 3;
        if (preset.scene_type.toLowerCase().includes(token)) score += 2;
      }
    }
    return { preset, score };
  });
  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, topN).map((s) => s.preset);
}

// supabase/functions/_shared/stage-knowledge.ts
var STAGE_KNOWLEDGE = [
  {
    programTypes: ["chorus", "mixed_chorus"],
    archetype: "\u5408\u5531",
    formations: [
      { name: "\u4E09\u6392\u9636\u68AF\u5F0F", summary: "\u524D\u4E2D\u540E\u4E09\u6392,\u6309\u8EAB\u9AD8\u7531\u77EE\u5230\u9AD8\u9636\u68AF\u7AD9\u4F4D", rows: 3, spacingRule: "\u5DE6\u53F3\u95F4\u8DDD 60cm,\u524D\u540E\u53F0\u9636\u843D\u5DEE 20cm", countRange: [15, 45], tips: "\u9886\u5531\u5C45\u4E2D\u524D\u6392,\u58F0\u90E8\u6309\u5DE6\u9AD8\u53F3\u4F4E\u5206\u533A\u3002" },
      { name: "\u5F27\u5F62\u73AF\u62B1\u5F0F", summary: "\u4E24\u6392\u5F27\u7EBF\u9762\u5411\u6307\u6325\u5448\u73AF\u62B1\u72B6", rows: 2, spacingRule: "\u5F27\u7EBF\u5F26\u8DDD 55cm,\u6392\u95F4 90cm", countRange: [10, 30], tips: "\u9002\u5408\u4E2D\u5C0F\u578B\u5408\u5531,\u58F0\u573A\u66F4\u805A\u62E2\u3002" },
      { name: "\u56DB\u6392\u5927\u5408\u5531\u5F0F", summary: "\u56DB\u6392\u6A2A\u5217\u914D\u5408\u5531\u53F0,\u6C14\u52BF\u578B\u7AD9\u4F4D", rows: 4, spacingRule: "\u5DE6\u53F3 55cm,\u9010\u6392\u589E\u9AD8 25cm", countRange: [40, 80], tips: "\u9700\u8981\u5408\u5531\u53F0\u67B6,\u672B\u6392\u6CE8\u610F\u5B89\u5168\u62A4\u680F\u3002" },
      { name: "\u4E2D\u5FC3\u9886\u5531\u653E\u5C04\u5F0F", summary: "\u9886\u5531\u5C45\u4E2D,\u58F0\u90E8\u5448\u653E\u5C04\u72B6\u5C55\u5F00", rows: 3, spacingRule: "\u653E\u5C04\u95F4\u9694 65cm,\u4E2D\u5FC3\u7559 1.5m \u8868\u6F14\u533A", countRange: [20, 50], tips: "\u9002\u5408\u6709\u72EC\u5531/\u9886\u5531\u6BB5\u843D\u7684\u66F2\u76EE\u3002" },
      // 以下 3 套沉淀自《超燃青春的合唱》(2026 爱奇艺) 舞台设计调研公式库 A
      { name: "SATB\u56DB\u58F0\u90E8\u534A\u5706\u5F0F", summary: "\u534A\u5706\u5F27 3-4 \u5C42,\u5973\u9AD8\u5728\u524D\u3001\u7537\u4F4E\u6700\u540E\u6700\u9AD8,\u58F0\u90E8\u5373\u5EFA\u7B51", rows: 4, spacingRule: "\u6D45\u5F27\u534A\u5F84\u7EA6 3m,\u6BCF\u6392\u95F4 60-80cm,\u4EBA\u8DDD 1.5 \u80A9\u5BBD", countRange: [25, 40], tips: "\u5973\u9AD8=\u5C4B\u9876/\u5973\u4E2D=\u5899\u58C1/\u7537\u9AD8=\u627F\u91CD\u5899/\u7537\u4F4E=\u5730\u57FA;\u534A\u5706\u4FDD\u8BC1\u5168\u5458\u770B\u5230\u6307\u6325;\u58F0\u90E8\u5185\u9AD8\u4E2A\u5C45\u4E2D\u77EE\u4E2A\u4E24\u4FA7\u3002" },
      { name: "\u53CC\u9635\u8425\u5BF9\u6297\u5F0F", summary: "\u5DE6\u53F3\u53CC\u9635\u8425\u7559 2m \u4E2D\u592E\u901A\u9053,\u9AD8\u6F6E\u6BB5\u843D\u5411\u4E2D\u5FC3\u5408\u9F99", rows: 2, spacingRule: "\u4E24\u9635\u8425\u5404\u5360\u534A\u53F0,\u4E2D\u95F4\u901A\u9053 2m,\u7EC4\u5185\u4EBA\u8DDD 70cm", countRange: [16, 50], tips: "\u9002\u5408\u8DE8\u73ED PK/\u4E3B\u9898\u8D5B;\u7F16\u6392\u300E\u5206-\u5408-\u5206\u300F\u4E09\u6BB5\u8D70\u4F4D,\u5408\u9F99\u70B9\u5BF9\u5E94\u526F\u6B4C\u6700\u540E\u4E00\u53E5;\u901A\u9053\u5373\u9886\u5531 solo \u4F4D\u3002" },
      { name: "\u6BD5\u4E1A\u6EE1\u5F27\u5F0F", summary: "\u63A5\u8FD1 3/4 \u5706\u7684\u6EE1\u5F27\u7FA4\u50CF,\u6838\u5FC3 solo \u5C45\u4E2D\u504F\u540E", rows: 2, spacingRule: "\u6EE1\u5F27\u4EBA\u8DDD\u4E00\u81C2\u5BBD,solo \u4F4D\u540E\u65B9\u7559\u5927\u5C4F/\u9876\u5149\u7A7A\u95F4", countRange: [20, 60], tips: "\u6BD5\u4E1A\u5178\u793C/\u6C47\u6F14\u538B\u8F74\u4E13\u7528;\u6EE1\u5F27\u662F\u5408\u5531\u7684\u539F\u59CB\u6BCD\u5F62,\u914D\u9876\u5149+\u70DF\u96FE\u6210\u300E\u7FA4\u50CF\u5373\u4EEA\u5F0F\u300F\u753B\u9762\u3002" }
    ],
    costumeStyles: [
      { name: "\u7ECF\u5178\u793C\u670D\u5F0F", female: "\u9F50\u8E1D\u7EAF\u8272\u793C\u670D\u88D9,\u6CE1\u6CE1\u8896\u6216\u98D8\u5E26\u8896", male: "\u767D\u886C\u886B + \u9A6C\u7532 + \u897F\u88E4 + \u9886\u7ED3", accessories: ["\u540C\u8272\u8170\u5C01", "\u80F8\u82B1"], moods: ["\u5E84\u91CD", "\u7ECF\u5178", "\u9882\u6B4C"] },
      { name: "\u56FD\u98CE\u8966\u88D9\u5F0F", female: "\u6539\u826F\u8966\u88D9,\u6E10\u53D8\u6C34\u8896", male: "\u7ACB\u9886\u76D8\u6263\u957F\u886B + \u76F4\u7B52\u88E4", accessories: ["\u53D1\u7C2A\u6216\u53D1\u5E26", "\u4E91\u7EB9\u8170\u5E26"], moods: ["\u56FD\u98CE", "\u53E4\u8BD7\u8BCD", "\u6C11\u6B4C"] },
      { name: "\u6E05\u65B0\u5B66\u9662\u5F0F", female: "\u767E\u8936\u88D9 + \u9488\u7EC7\u80CC\u5FC3 + \u767D\u886C\u886B", male: "\u767D\u886C\u886B + \u9488\u7EC7\u80CC\u5FC3 + \u5361\u5176\u88E4", accessories: ["\u9886\u7ED3/\u9886\u5E26", "\u767D\u889C\u767D\u978B"], moods: ["\u9752\u6625", "\u6821\u56ED", "\u8F7B\u5FEB"] },
      { name: "\u661F\u7A7A\u68A6\u5E7B\u5F0F", female: "\u4EAE\u7247\u6E10\u53D8\u7EB1\u88D9", male: "\u6DF1\u8272\u886C\u886B + \u5FAE\u4EAE\u9762\u9A6C\u7532", accessories: ["\u661F\u5149\u53D1\u5939", "\u8367\u5149\u624B\u73AF"], moods: ["\u68A6\u5E7B", "\u591C\u7A7A", "\u79D1\u5E7B"] }
    ],
    palettes: [
      { name: "\u6708\u767D\u975B\u84DD", primary: "\u6708\u767D", primaryHex: "#D6ECF0", secondary: "\u975B\u84DD", secondaryHex: "#1F3C88", accent: "\u94F6\u7070", accentHex: "#C0C5CE", family: ["\u84DD", "\u767D", "\u975B", "\u9752"], note: "\u51B7\u8272\u5B89\u9759\u805A\u7126,\u9002\u5408\u6292\u60C5\u66F2\u76EE\u4E0E\u51B7\u5149\u3002" },
      { name: "\u6731\u7802\u938F\u91D1", primary: "\u6731\u7EA2", primaryHex: "#C3272B", secondary: "\u938F\u91D1", secondaryHex: "#C89B40", accent: "\u7C73\u767D", accentHex: "#F5F1E8", family: ["\u7EA2", "\u91D1", "\u6731", "\u6A59"], note: "\u559C\u5E86\u6062\u5F18,\u9002\u5408\u9882\u6B4C\u4E0E\u8282\u5E86\u665A\u4F1A\u6696\u5149\u3002" },
      { name: "\u9752\u74F7\u7AF9\u5F71", primary: "\u9752\u74F7\u7EFF", primaryHex: "#7FB8A4", secondary: "\u7AF9\u9752", secondaryHex: "#789262", accent: "\u70EB\u91D1", accentHex: "#C9A34E", family: ["\u7EFF", "\u9752", "\u74F7"], note: "\u56FD\u98CE\u96C5\u81F4,\u4E0E\u6C34\u58A8\u80CC\u666F\u5C4F\u76F8\u5F97\u76CA\u5F70\u3002" },
      { name: "\u661F\u591C\u7D2B\u7F57", primary: "\u6DF1\u7D2B", primaryHex: "#4B2E83", secondary: "\u85CF\u84DD", secondaryHex: "#2E4E7E", accent: "\u94F6\u767D", accentHex: "#E5E7EB", family: ["\u7D2B", "\u84DD", "\u9ED1"], note: "\u68A6\u5E7B\u6DF1\u9083,\u914D\u5408\u661F\u7A7A\u8FFD\u5149\u6548\u679C\u597D\u3002" }
    ]
  },
  {
    programTypes: ["recitation", "host"],
    archetype: "\u6717\u8BF5/\u4E3B\u6301",
    formations: [
      { name: "\u4E00\u5B57\u6392\u5F00\u5F0F", summary: "\u5355\u6392\u6A2A\u5217,\u8BDD\u7B52\u4F4D\u7B49\u8DDD\u5206\u5E03", rows: 1, spacingRule: "\u4EBA\u8DDD 80cm,\u8DDD\u53F0\u53E3 2m", countRange: [2, 12], tips: "\u9886\u8BF5\u7AD9\u4E2D\u8F74,\u6CE8\u610F\u8BDD\u7B52\u9AD8\u5EA6\u5206\u6863\u3002" },
      { name: "\u53CC\u6392\u9519\u843D\u5F0F", summary: "\u524D\u540E\u4E24\u6392\u9519\u4F4D\u7AD9\u7ACB,\u5C42\u6B21\u611F\u5F3A", rows: 2, spacingRule: "\u9519\u4F4D\u534A\u80A9\u4F4D,\u6392\u95F4 1m", countRange: [8, 24], tips: "\u524D\u6392\u6301\u7A3F\u6216\u7A7A\u624B,\u540E\u6392\u7EDF\u4E00\u59FF\u6001\u3002" },
      { name: "\u9636\u68AF\u8BF5\u8BFB\u5F0F", summary: "\u4E09\u7EA7\u53F0\u9636\u7EB5\u6DF1\u5E03\u5C40,\u914D\u5408\u706F\u5149\u5206\u533A\u4EAE\u8D77", rows: 3, spacingRule: "\u53F0\u9636\u843D\u5DEE 25cm,\u5DE6\u53F3 70cm", countRange: [12, 36], tips: "\u9002\u5408\u7AE0\u8282\u5F0F\u957F\u8BD7,\u6309\u6BB5\u843D\u5206\u533A\u8D77\u7ACB\u3002" }
    ],
    costumeStyles: [
      { name: "\u767D\u8863\u80DC\u96EA\u5F0F", female: "\u767D\u8272\u957F\u88D9,\u7EA2\u8272\u62AB\u80A9\u6216\u98D8\u5E26", male: "\u767D\u886C\u886B + \u6DF1\u8272\u897F\u88E4 + \u7EA2\u56F4\u5DFE", accessories: ["\u7EA2\u8272\u80F8\u82B1", "\u767D\u624B\u5957(\u53EF\u9009)"], moods: ["\u7231\u56FD", "\u5E84\u91CD", "\u7EAA\u5FF5"] },
      { name: "\u9752\u887F\u4E66\u751F\u5F0F", female: "\u6DE1\u9752\u8966\u88D9,\u624B\u6301\u4E66\u5377", male: "\u6708\u767D\u957F\u886B + \u6298\u6247", accessories: ["\u4E66\u5377\u9053\u5177", "\u675F\u53D1\u5E26"], moods: ["\u53E4\u8BD7\u8BCD", "\u56FD\u5B66", "\u4E66\u9999"] },
      { name: "\u6B63\u88C5\u4E3B\u6301\u5F0F", female: "\u53CA\u819D\u793C\u670D\u88D9\u6216\u897F\u88C5\u5957\u88D9", male: "\u5168\u5957\u897F\u88C5 + \u9886\u5E26", accessories: ["\u80F8\u9488", "\u53E3\u888B\u5DFE"], moods: ["\u4E3B\u6301", "\u793C\u4EEA", "\u665A\u4F1A"] }
    ],
    palettes: [
      { name: "\u7EA2\u767D\u7ECF\u5178", primary: "\u6B63\u7EA2", primaryHex: "#C8102E", secondary: "\u7EAF\u767D", secondaryHex: "#FFFFFF", accent: "\u91D1", accentHex: "#D4AF37", family: ["\u7EA2", "\u767D"], note: "\u7231\u56FD\u6717\u8BF5\u9996\u9009,\u8FFD\u5149\u4E0B\u5BF9\u6BD4\u5F3A\u70C8\u3002" },
      { name: "\u9EDB\u9752\u6708\u767D", primary: "\u9EDB\u9752", primaryHex: "#425066", secondary: "\u6708\u767D", secondaryHex: "#D6ECF0", accent: "\u9EDB\u84DD", accentHex: "#33507A", family: ["\u9752", "\u84DD", "\u767D", "\u9EDB"], note: "\u53E4\u5178\u8BD7\u8BCD\u6C1B\u56F4,\u914D\u53E4\u7434\u4F34\u594F\u5C24\u4F73\u3002" },
      { name: "\u9999\u69DF\u91D1\u9ED1", primary: "\u9999\u69DF\u91D1", primaryHex: "#E6CFA3", secondary: "\u66DC\u77F3\u9ED1", secondaryHex: "#14141A", accent: "\u7C73\u767D", accentHex: "#F5F1E8", family: ["\u91D1", "\u9ED1", "\u9999\u69DF"], note: "\u665A\u4F1A\u4E3B\u6301\u8D28\u611F\u914D\u8272,\u5927\u5C4F\u6696\u5149\u9002\u914D\u3002" }
    ]
  },
  {
    programTypes: ["drama"],
    archetype: "\u620F\u5267/\u8BDD\u5267",
    formations: [
      { name: "\u573A\u666F\u533A\u5757\u5F0F", summary: "\u6309\u5267\u60C5\u573A\u666F\u5212\u5206\u821E\u53F0\u5DE6\u4E2D\u53F3\u4E09\u533A", rows: 2, spacingRule: "\u533A\u5757\u95F4\u7559 1.5m \u8D70\u4F4D\u901A\u9053", countRange: [5, 30], tips: "\u7FA4\u6F14\u80CC\u666F\u533A\u9760\u540E,\u4E3B\u89D2\u533A\u7559\u8FFD\u5149\u4F4D\u3002" },
      { name: "\u73AF\u5F62\u7FA4\u50CF\u5F0F", summary: "\u7FA4\u6F14\u56F4\u5408\u6210\u73AF,\u4E3B\u89D2\u5C45\u4E2D", rows: 2, spacingRule: "\u73AF\u534A\u5F84\u6309\u53F0\u6DF1 1/3,\u4EBA\u8DDD 70cm", countRange: [8, 25], tips: "\u5F00\u573A/\u95ED\u5E55\u7FA4\u50CF\u5B9A\u683C\u6548\u679C\u597D\u3002" },
      { name: "\u659C\u7EBF\u7EB5\u6DF1\u5F0F", summary: "\u5BF9\u89D2\u659C\u7EBF\u7AD9\u4F4D\u5236\u9020\u7EB5\u6DF1\u900F\u89C6", rows: 1, spacingRule: "\u659C\u7EBF\u4EBA\u8DDD 90cm,\u9996\u5C3E\u5BF9\u89D2", countRange: [4, 15], tips: "\u9002\u5408\u884C\u8FDB/\u5BF9\u5CD9\u7C7B\u5267\u60C5\u6BB5\u843D\u3002" }
    ],
    costumeStyles: [
      { name: "\u5E74\u4EE3\u5199\u5B9E\u5F0F", female: "\u6309\u5267\u672C\u5E74\u4EE3:\u65D7\u888D/\u5217\u5B81\u88C5/\u8FDE\u8863\u88D9", male: "\u957F\u886B/\u4E2D\u5C71\u88C5/\u5DE5\u88C5", accessories: ["\u5267\u60C5\u9053\u5177", "\u5E74\u4EE3\u5E3D\u9970"], moods: ["\u5386\u53F2", "\u7EA2\u8272\u7ECF\u5178", "\u5E74\u4EE3"] },
      { name: "\u7AE5\u8BDD\u5938\u5F20\u5F0F", female: "\u9AD8\u9971\u548C\u62FC\u8272\u6597\u7BF7\u88D9", male: "\u4EAE\u8272\u9A6C\u7532 + \u706F\u7B3C\u88E4", accessories: ["\u5938\u5F20\u5934\u9970", "\u5F69\u8272\u5047\u53D1(\u53EF\u9009)"], moods: ["\u7AE5\u8BDD", "\u5BD3\u8A00", "\u4F4E\u5B66\u6BB5"] },
      { name: "\u73B0\u4EE3\u7B80\u7EA6\u5F0F", female: "\u7EAF\u8272\u6253\u5E95 + \u6807\u5FD7\u6027\u5355\u54C1\u533A\u5206\u89D2\u8272", male: "\u540C\u8272\u7CFB\u6253\u5E95 + \u89D2\u8272\u6807\u8BC6\u5916\u5957", accessories: ["\u89D2\u8272\u724C", "\u5355\u8272\u56F4\u5DFE"], moods: ["\u73B0\u4EE3", "\u6821\u56ED\u5267", "\u5C0F\u54C1"] }
    ],
    palettes: [
      { name: "\u6000\u65E7\u68D5\u7070", primary: "\u5496\u68D5", primaryHex: "#6B4A2E", secondary: "\u70DF\u7070", secondaryHex: "#9CA3AF", accent: "\u519B\u7EFF", accentHex: "#4B5D3A", family: ["\u68D5", "\u7070", "\u7EFF"], note: "\u5E74\u4EE3\u5267\u6C89\u7A33\u57FA\u8C03,\u6696\u9EC4\u9762\u5149\u9002\u914D\u3002" },
      { name: "\u9AD8\u7CD6\u649E\u8272", primary: "\u67E0\u6AAC\u9EC4", primaryHex: "#FDE047", secondary: "\u6E56\u84DD", secondaryHex: "#2CA3CF", accent: "\u6843\u7C89", accentHex: "#F4A7B9", family: ["\u9EC4", "\u84DD", "\u7C89"], note: "\u7AE5\u8BDD\u5267\u9AD8\u8BC6\u522B\u5EA6,\u89D2\u8272\u533A\u5206\u5EA6\u9AD8\u3002" },
      { name: "\u9ED1\u767D\u91D1\u7126\u70B9", primary: "\u9ED1", primaryHex: "#111111", secondary: "\u767D", secondaryHex: "#FFFFFF", accent: "\u91D1", accentHex: "#D4AF37", family: ["\u9ED1", "\u767D", "\u91D1"], note: "\u73B0\u4EE3\u5267\u6781\u7B80,\u9760\u706F\u5149\u4E0E\u9053\u5177\u70B9\u8272\u3002" }
    ]
  },
  {
    programTypes: ["classical_dance", "folk_dance"],
    archetype: "\u53E4\u5178/\u6C11\u65CF\u821E",
    formations: [
      { name: "\u6247\u5F62\u7EFD\u653E\u5F0F", summary: "\u4EE5\u9886\u821E\u4E3A\u5FC3\u5448\u6247\u5F62\u5C55\u5F00,\u5C42\u5C42\u7EFD\u653E", rows: 3, spacingRule: "\u6247\u5F62\u5F27\u8DDD 80cm,\u5C42\u95F4 1.2m", countRange: [12, 32], tips: "\u6C34\u8896/\u7EF8\u6247\u9053\u5177\u4E0E\u6247\u5F62\u547C\u5E94\u6700\u4F73\u3002" },
      { name: "\u659C\u6392\u6D41\u6C34\u5F0F", summary: "\u53CC\u659C\u6392\u4EA4\u9519,\u5982\u6D41\u6C34\u4EA4\u6C47", rows: 2, spacingRule: "\u659C\u6392\u4EBA\u8DDD 1m,\u4EA4\u6C47\u533A\u7559 2m", countRange: [10, 24], tips: "\u9002\u5408\u5706\u573A\u6B65\u6D41\u52A8\u8C03\u5EA6\u3002" },
      { name: "\u5706\u9635\u56E2\u82B1\u5F0F", summary: "\u540C\u5FC3\u53CC\u5706,\u5185\u5708\u5916\u5708\u53CD\u5411\u65CB\u8F6C", rows: 2, spacingRule: "\u5185\u5708\u534A\u5F84 2m,\u5916\u5708 3.5m", countRange: [16, 36], tips: "\u4FEF\u62CD\u955C\u5934\u4E0B\u5448\u56E2\u82B1\u56FE\u6848\u3002" },
      { name: "\u96C1\u9635\u659C\u98DE\u5F0F", summary: "\u4EBA\u5B57\u96C1\u9635,\u9886\u821E\u5C45\u5C16", rows: 3, spacingRule: "\u96C1\u7FFC\u95F4\u8DDD 90cm,\u524D\u540E\u9519\u534A\u6B65", countRange: [9, 21], tips: "\u6C11\u65CF\u821E\u8499\u53E4\u65CF/\u50A3\u65CF\u9898\u6750\u5E38\u7528\u3002" }
    ],
    costumeStyles: [
      { name: "\u6C34\u8896\u5E7F\u8896\u5F0F", female: "\u9F50\u80F8\u8966\u88D9 + \u52A0\u957F\u6C34\u8896", male: "\u4EA4\u9886\u5927\u8896\u888D + \u675F\u8170", accessories: ["\u70B9\u7FE0\u5934\u9970", "\u6D41\u82CF\u8170\u5760"], moods: ["\u53E4\u5178", "\u6C49\u5510", "\u6C34\u58A8"] },
      { name: "\u6C11\u65CF\u76DB\u88C5\u5F0F", female: "\u5BF9\u5E94\u6C11\u65CF\u7EB9\u6837\u88D9\u88C5(\u5982\u50A3\u65CF\u7B52\u88D9/\u8499\u53E4\u65CF\u957F\u888D)", male: "\u5BF9\u5E94\u6C11\u65CF\u9A6C\u7532\u957F\u888D + \u8170\u5E26", accessories: ["\u94F6\u9970", "\u6C11\u65CF\u5934\u5DFE/\u5E3D"], moods: ["\u6C11\u65CF", "\u8282\u5E86", "\u98CE\u60C5"] },
      { name: "\u8F7B\u7EB1\u5199\u610F\u5F0F", female: "\u591A\u5C42\u6E10\u53D8\u8F7B\u7EB1\u88D9,\u4FBF\u4E8E\u65CB\u8F6C", male: "\u98D8\u9038\u5F00\u886B + \u9614\u817F\u88E4", accessories: ["\u7EF8\u6247/\u7EF8\u5E26\u9053\u5177", "\u7D20\u8272\u53D1\u5E26"], moods: ["\u5199\u610F", "\u5C71\u6C34", "\u6708\u5149"] }
    ],
    palettes: [
      { name: "\u9EDB\u5C71\u8FDC\u6C34", primary: "\u9EDB\u7EFF", primaryHex: "#3D5C4F", secondary: "\u8FDC\u5C71\u7070", secondaryHex: "#B9C0C9", accent: "\u6CE5\u91D1", accentHex: "#B08D57", family: ["\u7EFF", "\u7070", "\u9752", "\u9EDB"], note: "\u6C34\u58A8\u5C71\u6C34\u610F\u8C61,\u51B7\u5149\u8584\u96FE\u6548\u679C\u4F73\u3002" },
      { name: "\u77F3\u69B4\u7EEF\u7EA2", primary: "\u77F3\u69B4\u7EA2", primaryHex: "#D23B2E", secondary: "\u6A58\u6A59", secondaryHex: "#F08C2E", accent: "\u660E\u9EC4", accentHex: "#FCD337", family: ["\u7EA2", "\u6A59", "\u9EC4"], note: "\u70ED\u70C8\u6C11\u65CF\u98CE,\u7BDD\u706B/\u4E30\u6536\u9898\u6750\u9996\u9009\u3002" },
      { name: "\u5B54\u96C0\u7FE0\u84DD", primary: "\u5B54\u96C0\u84DD", primaryHex: "#147E8F", secondary: "\u7FE0\u7EFF", secondaryHex: "#2E8B57", accent: "\u94F6\u767D", accentHex: "#E5E7EB", family: ["\u84DD", "\u7EFF", "\u7FE0"], note: "\u50A3\u65CF\u5B54\u96C0\u821E\u7ECF\u5178\u914D\u8272,\u51B7\u6696\u5149\u7686\u5B9C\u3002" },
      { name: "\u6708\u534E\u7D20\u767D", primary: "\u7D20\u767D", primaryHex: "#F8F8F4", secondary: "\u6DE1\u85D5\u8377", secondaryHex: "#E4C6D0", accent: "\u6D45\u91D1", accentHex: "#E3C88F", family: ["\u767D", "\u7D2B", "\u85D5"], note: "\u6708\u5149/\u4ED9\u9E64\u9898\u6750,\u9006\u5149\u526A\u5F71\u6781\u7F8E\u3002" }
    ]
  },
  {
    programTypes: ["ballet"],
    archetype: "\u82AD\u857E",
    formations: [
      { name: "\u5BF9\u79F0\u53CC\u7FFC\u5F0F", summary: "\u4EE5\u4E2D\u8F74\u5BF9\u79F0\u53CC\u7FFC\u5C55\u5F00,\u7FA4\u821E\u886C\u72EC\u821E", rows: 2, spacingRule: "\u5BF9\u79F0\u4EBA\u8DDD 1.2m,\u4E2D\u8F74\u7559 3m \u72EC\u821E\u533A", countRange: [8, 24], tips: "\u7ECF\u5178\u7FA4\u821E\u8303\u5F0F,\u6CE8\u610F\u8DB3\u5C16\u533A\u5730\u80F6\u3002" },
      { name: "\u659C\u7EBF\u5927\u8DF3\u901A\u9053\u5F0F", summary: "\u7FA4\u821E\u8BA9\u51FA\u5BF9\u89D2\u901A\u9053\u4F9B\u5927\u8DF3\u8FDE\u63A5", rows: 2, spacingRule: "\u901A\u9053\u5BBD 2.5m,\u4E24\u4FA7\u4EBA\u8DDD 1m", countRange: [10, 20], tips: "\u6280\u5DE7\u5C55\u793A\u6BB5\u843D\u4E13\u7528\u3002" },
      { name: "\u56DB\u5C0F\u5929\u9E45\u6A2A\u5217\u5F0F", summary: "\u7D27\u51D1\u5355\u6392\u624B\u633D\u624B\u5C0F\u961F", rows: 1, spacingRule: "\u80A9\u8DDD\u8D34\u5408,\u961F\u5BBD\u6309 4-8 \u4EBA", countRange: [4, 8], tips: "\u6574\u9F50\u5EA6\u8981\u6C42\u6781\u9AD8,\u5EFA\u8BAE\u7B49\u9AD8\u7F16\u961F\u3002" }
    ],
    costumeStyles: [
      { name: "\u7ECF\u5178 TUTU \u5F0F", female: "\u7EB1\u8D28 TUTU \u88D9 + \u8DB3\u5C16\u978B", male: "\u7D27\u8EAB\u4E0A\u8863 + \u5F39\u529B\u88E4 + \u8F6F\u5E95\u978B", accessories: ["\u5934\u51A0/\u53D1\u7F51", "\u8089\u8272\u6253\u5E95\u889C"], moods: ["\u7ECF\u5178", "\u5929\u9E45\u6E56", "\u6BD4\u8D5B"] },
      { name: "\u6D6A\u6F2B\u957F\u7EB1\u5F0F", female: "\u53CA\u5C0F\u817F\u6D6A\u6F2B\u7EB1\u88D9(Romantic tutu)", male: "\u8BD7\u4EBA\u886B + \u5F39\u529B\u88E4", accessories: ["\u82B1\u73AF\u53D1\u9970", "\u7F0E\u5E26"], moods: ["\u6D6A\u6F2B", "\u4ED9\u5973", "\u6292\u60C5"] }
    ],
    palettes: [
      { name: "\u5929\u9E45\u767D\u84DD", primary: "\u7EAF\u767D", primaryHex: "#FFFFFF", secondary: "\u51B0\u84DD", secondaryHex: "#A8D8EA", accent: "\u94F6", accentHex: "#C0C0C0", family: ["\u767D", "\u84DD", "\u94F6"], note: "\u7ECF\u5178\u5929\u9E45\u610F\u8C61,\u51B7\u8272\u8FFD\u5149\u9002\u914D\u3002" },
      { name: "\u9ED1\u5929\u9E45\u91D1", primary: "\u66DC\u9ED1", primaryHex: "#14141A", secondary: "\u6697\u91D1", secondaryHex: "#9A7B2D", accent: "\u7EEF\u7EA2", accentHex: "#C41E3A", family: ["\u9ED1", "\u91D1", "\u7EA2"], note: "\u620F\u5267\u5F20\u529B\u5F3A,\u9002\u5408\u9ED1\u5929\u9E45\u53D8\u594F\u3002" },
      { name: "\u6A31\u7C89\u6D6A\u6F2B", primary: "\u6A31\u82B1\u7C89", primaryHex: "#F7C9D4", secondary: "\u9999\u69DF", secondaryHex: "#E6CFA3", accent: "\u6DE1\u7D2B", accentHex: "#C6B5DD", family: ["\u7C89", "\u7D2B", "\u9999\u69DF"], note: "\u4F4E\u5B66\u6BB5\u82AD\u857E\u542F\u8499\u5E38\u7528,\u67D4\u5149\u9002\u914D\u3002" }
    ]
  },
  {
    programTypes: ["modern_jazz_street"],
    archetype: "\u73B0\u4EE3/\u7235\u58EB/\u8857\u821E",
    formations: [
      { name: "\u91D1\u5B57\u5854\u7206\u70B9\u5F0F", summary: "\u4E09\u89D2\u91D1\u5B57\u5854,\u526F\u6B4C\u77AC\u95F4\u6563\u5F00\u7206\u70B9", rows: 3, spacingRule: "\u5854\u5C16 1 \u4EBA,\u5C42\u8DDD 1m,\u6563\u5F00\u534A\u5F84 3m", countRange: [7, 21], tips: "\u914D\u5408\u97F3\u4E50\u91CD\u62CD\u8BBE\u8BA1\u961F\u5F62\u70B8\u5F00\u3002" },
      { name: "\u5206\u7EC4 Battle \u5F0F", summary: "\u5DE6\u53F3\u4E24\u7EC4\u5BF9\u5CD9\u8F6E\u6D41\u8F93\u51FA", rows: 2, spacingRule: "\u7EC4\u95F4 4m \u5BF9\u5CD9\u533A,\u7EC4\u5185 80cm", countRange: [8, 20], tips: "\u8857\u821E battle \u6BB5\u843D,\u6CE8\u610F\u8F6E\u6362\u8D70\u4F4D\u3002" },
      { name: "\u6CE2\u6D6A\u63A8\u8FDB\u5F0F", summary: "\u6A2A\u6392\u6CE2\u6D6A\u5F8B\u52A8\u9010\u6392\u63A8\u8FDB", rows: 3, spacingRule: "\u6392\u95F4 1.2m,\u63A8\u8FDB\u6B65\u5E45 60cm", countRange: [12, 30], tips: "Waacking/wave \u7C7B\u52A8\u4F5C\u4E32\u8054\u597D\u3002" },
      { name: "\u6563\u70B9\u91CD\u7EC4\u5F0F", summary: "\u81EA\u7531\u6563\u70B9\u8D77\u624B,\u526F\u6B4C\u6536\u62E2\u6210\u56FE\u5F62", rows: 2, spacingRule: "\u6563\u70B9\u6700\u5C0F\u95F4\u8DDD 1m", countRange: [10, 28], tips: "\u73B0\u4EE3\u821E\u5E38\u7528,\u6CE8\u610F\u6536\u62E2\u8DEF\u7EBF\u4E0D\u4EA4\u53C9\u3002" }
    ],
    costumeStyles: [
      { name: "\u8857\u5934\u5DE5\u88C5\u5F0F", female: "oversize \u536B\u8863 + \u5DE5\u88C5\u88E4", male: "oversize T\u6064 + \u675F\u811A\u5DE5\u88C5\u88E4", accessories: ["\u68D2\u7403\u5E3D/\u6E14\u592B\u5E3D", "\u8170\u5305", "\u9AD8\u5E2E\u677F\u978B"], moods: ["\u8857\u821E", "hip-hop", "\u6D3B\u529B"] },
      { name: "\u7235\u58EB\u4EAE\u7247\u5F0F", female: "\u4EAE\u7247\u77ED\u4E0A\u8863 + \u9AD8\u8170\u9614\u817F\u88E4", male: "\u7F0E\u9762\u886C\u886B + \u76F4\u7B52\u88E4", accessories: ["\u4EAE\u7247\u624B\u5957", "\u793C\u5E3D"], moods: ["\u7235\u58EB", "\u590D\u53E4", "\u767E\u8001\u6C47"] },
      { name: "\u73B0\u4EE3\u6781\u7B80\u5F0F", female: "\u7EAF\u8272\u5BBD\u677E\u5957\u88C5,\u4FBF\u4E8E\u5730\u9762\u52A8\u4F5C", male: "\uFFFD\uFFFD\u8272\u7CFB\u5BBD\u677E\u5957\u88C5", accessories: ["\u65E0\u914D\u9970\u6216\u5355\u8272\u53D1\u5E26"], moods: ["\u73B0\u4EE3\u821E", "\u5148\u950B", "\u60C5\u7EEA"] },
      { name: "\u8367\u5149\u673A\u80FD\u5F0F", female: "\u8367\u5149\u62FC\u63A5\u7D27\u8EAB\u8863 + \u53CD\u5149\u6761", male: "\u673A\u80FD\u9A6C\u7532 + \u8367\u5149\u675F\u811A\u88E4", accessories: ["\u8367\u5149\u624B\u73AF", "LED \u978B\u5E26(\u53EF\u9009)"], moods: ["\u79D1\u5E7B", "\u7535\u97F3", "\u591C\u5149"] }
    ],
    palettes: [
      { name: "\u9ED1\u91D1\u8857\u5934", primary: "\u9ED1", primaryHex: "#111111", secondary: "\u91D1", secondaryHex: "#D4AF37", accent: "\u767D", accentHex: "#FFFFFF", family: ["\u9ED1", "\u91D1", "\u767D"], note: "\u8857\u821E\u4E07\u80FD\u914D\u8272,\u9891\u95EA\u706F\u6548\u679C\u70B8\u88C2\u3002" },
      { name: "\u8367\u5149\u649E\u8272", primary: "\u8367\u5149\u7EFF", primaryHex: "#39FF14", secondary: "\u7535\u5149\u7D2B", secondaryHex: "#BF00FF", accent: "\u4EAE\u6A59", accentHex: "#FF6D00", family: ["\u7EFF", "\u7D2B", "\u6A59", "\u8367\u5149"], note: "\u7D2B\u5916\u706F/\u9ED1\u5149\u706F\u4E0B\u53D1\u5149,\u70B8\u573A\u9996\u9009\u3002" },
      { name: "\u725B\u4ED4\u84DD\u767D", primary: "\u725B\u4ED4\u84DD", primaryHex: "#3E6B9B", secondary: "\u7EAF\u767D", secondaryHex: "#FFFFFF", accent: "\u7EA2", accentHex: "#D2222D", family: ["\u84DD", "\u767D", "\u7EA2", "\u725B\u4ED4"], note: "\u590D\u53E4\u7F8E\u5F0F,\u9752\u6625\u8FD0\u52A8\u611F\u5F3A\u3002" }
    ]
  },
  {
    programTypes: ["western_orchestra", "folk_orchestra", "instrument"],
    archetype: "\u5668\u4E50/\u7BA1\u5F26\u4E50",
    formations: [
      { name: "\u6307\u6325\u6247\u5F62\u5F0F", summary: "\u4EE5\u6307\u6325\u4E3A\u5FC3\u7684\u6247\u5F62\u58F0\u90E8\u5E03\u5C40", rows: 3, spacingRule: "\u8C31\u67B6\u95F4\u8DDD 1.2m,\u58F0\u90E8\u5F27\u7EBF\u6392\u5217", countRange: [15, 60], tips: "\u5F26\u4E50\u524D\u3001\u7BA1\u4E50\u4E2D\u3001\u6253\u51FB\u4E50\u540E\u4E3A\u7ECF\u5178\u6392\u5E03\u3002" },
      { name: "\u6C11\u4E50\u516B\u5B57\u5F0F", summary: "\u62C9\u5F26\u5F39\u62E8\u5448\u516B\u5B57\u5206\u5217,\u5439\u6253\u5C45\u540E", rows: 3, spacingRule: "\u516B\u5B57\u5939\u89D2\u7EA6 120\xB0,\u4EBA\u8DDD 1m", countRange: [12, 45], tips: "\u6C11\u65CF\u7BA1\u5F26\u4E50\u56E2\u6807\u51C6\u9635\u578B\u3002" },
      { name: "\u5C0F\u5408\u594F\u534A\u5706\u5F0F", summary: "\u5355\u6392\u6216\u53CC\u6392\u534A\u5706\u9762\u5411\u89C2\u4F17", rows: 2, spacingRule: "\u534A\u5706\u5F26\u8DDD 1m", countRange: [3, 14], tips: "\u91CD\u594F/\u5C0F\u5408\u594F\u9002\u7528,\u6CE8\u610F\u4E50\u5668\u706F\u4F4D\u3002" }
    ],
    costumeStyles: [
      { name: "\u4EA4\u54CD\u6B63\u88C5\u5F0F", female: "\u9ED1\u8272\u957F\u88D9\u6216\u9ED1\u8272\u5957\u88C5", male: "\u9ED1\u897F\u88C5/\u71D5\u5C3E\u670D + \u767D\u886C\u886B + \u9886\u7ED3", accessories: ["\u73CD\u73E0\u9879\u94FE(\u53EF\u9009)", "\u8896\u6263"], moods: ["\u4EA4\u54CD", "\u53E4\u5178", "\u6B63\u5F0F"] },
      { name: "\u6C11\u4E50\u56FD\u98CE\u5F0F", female: "\u6539\u826F\u65D7\u888D\u6216\u8966\u88D9(\u6F14\u594F\u8896\u53E3\u6536\u7A84)", male: "\u7ACB\u9886\u76D8\u6263\u4E0A\u8863 + \u76F4\u7B52\u88E4", accessories: ["\u7389\u5760", "\u675F\u53D1\u7C2A"], moods: ["\u6C11\u4E50", "\u56FD\u98CE", "\u96C5\u96C6"] },
      { name: "\u8F7B\u5FEB\u5BA4\u5185\u4E50\u5F0F", female: "\u7EAF\u8272\u8FDE\u8863\u88D9(\u540C\u8272\u4E0D\u540C\u6B3E)", male: "\u886C\u886B + \u9A6C\u7532(\u53BB\u5916\u5957)", accessories: ["\u540C\u8272\u7CFB\u9886\u7ED3"], moods: ["\u5BA4\u5185\u4E50", "\u8F7B\u5FEB", "\u6821\u56ED"] }
    ],
    palettes: [
      { name: "\u66DC\u9ED1\u7EAF\u767D", primary: "\u9ED1", primaryHex: "#111111", secondary: "\u767D", secondaryHex: "#FFFFFF", accent: "\u94F6", accentHex: "#C0C0C0", family: ["\u9ED1", "\u767D", "\u94F6"], note: "\u4EA4\u54CD\u6807\u51C6\u914D\u8272,\u6C38\u4E0D\u51FA\u9519\u3002" },
      { name: "\u7EDB\u7D2B\u938F\u91D1", primary: "\u7EDB\u7D2B", primaryHex: "#5C2A4D", secondary: "\u938F\u91D1", secondaryHex: "#C89B40", accent: "\u7C73\u767D", accentHex: "#F5F1E8", family: ["\u7D2B", "\u91D1", "\u7EDB"], note: "\u6C11\u4E50\u76DB\u5178\u8D28\u611F,\u6696\u5149\u4E0B\u534E\u8D35\u3002" },
      { name: "\u9EDB\u84DD\u6708\u767D", primary: "\u9EDB\u84DD", primaryHex: "#33507A", secondary: "\u6708\u767D", secondaryHex: "#D6ECF0", accent: "\u6D45\u91D1", accentHex: "#E3C88F", family: ["\u84DD", "\u767D", "\u9EDB"], note: "\u6587\u4EBA\u96C5\u96C6\u6C14\u8D28,\u9002\u5408\u4E1D\u7AF9\u5C0F\u5408\u594F\u3002" }
    ]
  },
  {
    programTypes: ["etiquette_award"],
    archetype: "\u793C\u4EEA/\u9881\u5956",
    formations: [
      { name: "\u5939\u9053\u793C\u5BBE\u5F0F", summary: "\u53CC\u5217\u5939\u9053,\u5F15\u5BFC\u52A8\u7EBF\u6E05\u6670", rows: 2, spacingRule: "\u5217\u8DDD 2.5m \u901A\u9053,\u4EBA\u8DDD 1m", countRange: [6, 20], tips: "\u6258\u76D8\u624B\u7EDF\u4E00\u9AD8\u5EA6\u4E0E\u89D2\u5EA6\u3002" },
      { name: "\u9881\u5956\u68AF\u53F0\u5F0F", summary: "\u9886\u5956\u53F0\u4E09\u7EA7 + \u793C\u4EEA\u4E24\u7FFC\u7AD9\u4F4D", rows: 2, spacingRule: "\u4E24\u7FFC\u8DDD\u53F0 1.5m \u5BF9\u79F0", countRange: [4, 12], tips: "\u6CE8\u610F\u4E0E\u6444\u5F71\u673A\u4F4D\u4E0D\u906E\u6321\u3002" }
    ],
    costumeStyles: [
      { name: "\u7EA2\u8272\u793C\u4EEA\u5F0F", female: "\u7EA2\u8272\u7ACB\u9886\u65D7\u888D + \u767D\u624B\u5957", male: "\u6DF1\u8272\u897F\u88C5 + \u7EA2\u9886\u5E26 + \u767D\u624B\u5957", accessories: ["\u7EF6\u5E26", "\u6258\u76D8(\u9053\u5177)"], moods: ["\u9881\u5956", "\u5E86\u5178", "\u6B63\u5F0F"] },
      { name: "\u9999\u69DF\u665A\u793C\u5F0F", female: "\u9999\u69DF\u8272\u9C7C\u5C3E\u793C\u670D", male: "\u9ED1\u897F\u88C5 + \u9999\u69DF\u9886\u7ED3", accessories: ["\u73CD\u73E0\u8033\u9970(\u5939\u5F0F)", "\u53E3\u888B\u5DFE"], moods: ["\u665A\u4F1A", "\u9AD8\u96C5", "\u5E74\u5EA6\u76DB\u5178"] }
    ],
    palettes: [
      { name: "\u4E2D\u56FD\u7EA2\u91D1", primary: "\u4E2D\u56FD\u7EA2", primaryHex: "#C8102E", secondary: "\u91D1", secondaryHex: "#D4AF37", accent: "\u767D", accentHex: "#FFFFFF", family: ["\u7EA2", "\u91D1", "\u767D"], note: "\u9881\u5956\u5E86\u5178\u6807\u51C6\u914D\u8272,\u5927\u5C4F\u7EA2\u91D1\u547C\u5E94\u3002" },
      { name: "\u9999\u69DF\u8C61\u7259", primary: "\u9999\u69DF\u91D1", primaryHex: "#E6CFA3", secondary: "\u8C61\u7259\u767D", secondaryHex: "#F8F4E3", accent: "\u6D45\u5496", accentHex: "#B49B7F", family: ["\u91D1", "\u767D", "\u9999\u69DF"], note: "\u9AD8\u96C5\u4F4E\u8C03,\u9002\u5408\u5B66\u672F\u7C7B\u9881\u5956\u3002" }
    ]
  },
  {
    programTypes: ["acrobatics_martial_arts", "cheerleading", "sports_opening_ceremony"],
    archetype: "\u6B66\u672F/\u5566\u5566\u64CD/\u5F00\u5E55\u5F0F",
    formations: [
      { name: "\u65B9\u9635\u51B2\u51FB\u5F0F", summary: "\u6574\u9F50\u65B9\u9635\u9F50\u8FDB\u9F50\u505C,\u6C14\u52BF\u538B\u573A", rows: 4, spacingRule: "\u6A2A\u7EB5\u5404 1.2m,\u8E29\u70B9\u884C\u8FDB", countRange: [16, 64], tips: "\u6B66\u672F\u64CD/\u5165\u573A\u5F0F\u7ECF\u5178,\u91CD\u97F3\u8E0F\u6B65\u7EDF\u4E00\u3002" },
      { name: "\u91D1\u5B57\u5854\u53E0\u5C42\u5F0F", summary: "\u5566\u5566\u64CD\u6258\u4E3E\u91D1\u5B57\u5854\u9020\u578B", rows: 3, spacingRule: "\u5E95\u5C42\u4EBA\u8DDD 60cm,\u4FDD\u62A4\u4F4D\u56DB\u89D2", countRange: [12, 24], tips: "\u6258\u4E3E\u5FC5\u987B\u914D\u4FDD\u62A4\u5458,\u5148\u5730\u9762\u540E\u7A7A\u4E2D\u3002" },
      { name: "\u56FE\u5F62\u53D8\u6362\u5F0F", summary: "\u7531\u65B9\u9635\u53D8\u6362\u51FA\u5B57\u6BCD/\u6570\u5B57/\u56FE\u6848", rows: 4, spacingRule: "\u7F51\u683C 1m \u70B9\u4F4D,\u6309\u7F16\u53F7\u8D70\u4F4D", countRange: [24, 100], tips: "\u5F00\u5E55\u5F0F\u5E38\u7528,\u53D1\u70B9\u4F4D\u7F16\u53F7\u5361\u3002" },
      { name: "\u53CC\u9F99\u51FA\u6C34\u5F0F", summary: "\u4E24\u5217\u7EB5\u961F\u4EA4\u53C9\u7A7F\u63D2\u884C\u8FDB", rows: 2, spacingRule: "\u7EB5\u961F\u4EBA\u8DDD 1m,\u4EA4\u53C9\u53E3\u9519\u62CD\u901A\u8FC7", countRange: [12, 40], tips: "\u6B66\u672F/\u821E\u9F99\u9898\u6750\u5165\u573A\u8C03\u5EA6\u3002" }
    ],
    costumeStyles: [
      { name: "\u6B66\u672F\u7EC3\u529F\u5F0F", female: "\u7EA2\u8272\u7EC3\u529F\u670D + \u675F\u8170", male: "\u9ED1/\u7EA2\u7EC3\u529F\u670D + \u7ED1\u817F", accessories: ["\u5F69\u5E26\u675F\u8170", "\u5E03\u978B"], moods: ["\u6B66\u672F", "\u529F\u592B", "\u5C11\u5E74\u5F3A"] },
      { name: "\u5566\u5566\u64CD\u4EAE\u7247\u5F0F", female: "\u4EAE\u7247\u80CC\u5FC3\u88D9 + \u77ED\u88E4\u6253\u5E95", male: "\u8FD0\u52A8\u80CC\u5FC3 + \u8FD0\u52A8\u957F\u88E4", accessories: ["\u82B1\u7403", "\u8FD0\u52A8\u53D1\u5E26", "\u767D\u8272\u8FD0\u52A8\u978B"], moods: ["\u5566\u5566\u64CD", "\u6D3B\u529B", "\u7ADE\u6280"] },
      { name: "\u5F00\u5E55\u5F0F\u65B9\u9635\u5F0F", female: "\u7EDF\u4E00\u8272\u8FD0\u52A8\u5957\u88C5", male: "\u7EDF\u4E00\u8272\u8FD0\u52A8\u5957\u88C5", accessories: ["\u65B9\u9635\u65D7", "\u767D\u624B\u5957", "\u7EDF\u4E00\u5E3D"], moods: ["\u5F00\u5E55\u5F0F", "\u5165\u573A", "\u56E2\u4F53"] }
    ],
    palettes: [
      { name: "\u70BD\u7130\u7EA2\u9ED1", primary: "\u70BD\u7EA2", primaryHex: "#D93025", secondary: "\u9ED1", secondaryHex: "#111111", accent: "\u91D1", accentHex: "#D4AF37", family: ["\u7EA2", "\u9ED1", "\u91D1"], note: "\u6B66\u672F\u529B\u91CF\u611F\u914D\u8272,\u9F13\u70B9\u706F\u5149\u540C\u6B65\u4F73\u3002" },
      { name: "\u6D3B\u529B\u84DD\u6A59", primary: "\u5B9D\u84DD", primaryHex: "#2653C9", secondary: "\u4EAE\u6A59", secondaryHex: "#FF8200", accent: "\u767D", accentHex: "#FFFFFF", family: ["\u84DD", "\u6A59", "\u767D"], note: "\u5566\u5566\u64CD\u9AD8\u5BF9\u6BD4\u649E\u8272,\u767D\u5929\u6237\u5916\u9192\u76EE\u3002" },
      { name: "\u9752\u6625\u7EFF\u767D", primary: "\u8349\u7EFF", primaryHex: "#6AA84F", secondary: "\u767D", secondaryHex: "#FFFFFF", accent: "\u660E\u9EC4", accentHex: "#FCD337", family: ["\u7EFF", "\u767D", "\u9EC4"], note: "\u8FD0\u52A8\u4F1A\u5F00\u5E55\u6E05\u65B0\u914D\u8272,\u8349\u576A\u573A\u5730\u878D\u5408\u3002" }
    ]
  },
  {
    programTypes: ["class_showcase", "new_year_gala", "holiday_festival", "reunion_gala", "non_competition_group_show"],
    archetype: "\u665A\u4F1A/\u5C55\u6F14",
    formations: [
      { name: "\u5206\u7EC4\u8F6E\u8F6C\u5F0F", summary: "\u591A\u5C0F\u7EC4\u8F6E\u6D41\u4E0A\u524D,\u5176\u4F59\u7EC4\u5B9A\u683C\u80CC\u666F", rows: 3, spacingRule: "\u7EC4\u95F4 2m,\u524D\u533A\u8868\u6F14\u4F4D\u7559 4m", countRange: [15, 50], tips: "\u4E32\u70E7\u8282\u76EE\u901A\u7528,\u7EC4\u95F4\u5207\u6362\u914D\u706F\u5149\u5207\u533A\u3002" },
      { name: "\u534A\u73AF\u8C22\u5E55\u5F0F", summary: "\u5168\u5458\u534A\u73AF\u9762\u5411\u89C2\u4F17,\u4E2D\u592E\u7559\u4E3B\u6301\u4F4D", rows: 2, spacingRule: "\u534A\u73AF\u5F26\u8DDD 70cm", countRange: [10, 60], tips: "\u5F00\u573A/\u8C22\u5E55\u901A\u7528,\u6CE8\u610F\u4E24\u7AEF\u4E0D\u51FA\u4FA7\u5E55\u3002" },
      { name: "\u661F\u5F62\u7EFD\u653E\u5F0F", summary: "\u4E94\u89D2\u661F\u5F62\u4E94\u81C2\u5C55\u5F00,\u8F6E\u6D41\u4EAE\u81C2", rows: 2, spacingRule: "\u81C2\u95F4\u5939\u89D2 72\xB0,\u81C2\u5185\u4EBA\u8DDD 80cm", countRange: [15, 40], tips: "\u65B0\u5E74\u665A\u4F1A\u4E3B\u89C6\u89C9\u961F\u5F62,\u4FEF\u62CD\u51FA\u56FE\u3002" }
    ],
    costumeStyles: [
      { name: "\u8282\u5E86\u559C\u4E50\u5F0F", female: "\u7EA2\u8272\u7CFB\u8FDE\u8863\u88D9\u6216\u5510\u88C5\u4E0A\u8863", male: "\u5510\u88C5\u9A6C\u7532 + \u6DF1\u8272\u88E4", accessories: ["\u4E2D\u56FD\u7ED3\u6302\u9970", "\u7EA2\u56F4\u5DFE"], moods: ["\u65B0\u5E74", "\u8282\u5E86", "\u559C\u5E86"] },
      { name: "\u73ED\u7EA7\u7EDF\u4E00\u5F0F", female: "\u73ED\u670D + \u7EDF\u4E00\u4E0B\u88C5", male: "\u73ED\u670D + \u7EDF\u4E00\u4E0B\u88C5", accessories: ["\u73ED\u7EA7\u5FBD\u7AE0", "\u7EDF\u4E00\u978B\u8272"], moods: ["\u73ED\u7EA7\u5C55\u6F14", "\u4F4E\u6210\u672C", "\u7EDF\u4E00"] },
      { name: "\u591A\u5F69\u6DF7\u642D\u5F0F", female: "\u540C\u6B3E\u4E0D\u540C\u8272\u7CFB\u8FDE\u8863\u88D9(\u5F69\u8679\u5206\u5E03)", male: "\u540C\u6B3E\u4E0D\u540C\u8272 polo/\u886C\u886B", accessories: ["\u540C\u8272\u7CFB\u53D1\u5E26/\u9886\u7ED3"], moods: ["\u7F24\u7EB7", "\u6B22\u4E50", "\u5927\u5408\u5531\u8C22\u5E55"] }
    ],
    palettes: [
      { name: "\u65B0\u6625\u7EA2\u91D1", primary: "\u6B63\u7EA2", primaryHex: "#C8102E", secondary: "\u91D1", secondaryHex: "#D4AF37", accent: "\u4E2D\u56FD\u767D", accentHex: "#FBF6EF", family: ["\u7EA2", "\u91D1", "\u767D"], note: "\u65B0\u5E74\u665A\u4F1A\u4E0D\u4E8C\u4E4B\u9009,\u706F\u7B3C\u5927\u5C4F\u547C\u5E94\u3002" },
      { name: "\u5F69\u8679\u4E03\u8272", primary: "\u7EA2\u6A59\u9EC4", primaryHex: "#E4572E", secondary: "\u7EFF\u84DD\u7D2B", secondaryHex: "#3A7BD5", accent: "\u767D", accentHex: "#FFFFFF", family: ["\u5F69\u8679", "\u591A\u5F69", "\u4E03\u5F69"], note: "\u591A\u73ED\u7EA7\u8054\u5408\u5C55\u6F14,\u6309\u73ED\u5206\u8272\u8BC6\u522B\u5EA6\u9AD8\u3002" },
      { name: "\u6696\u6A58\u5976\u767D", primary: "\u6696\u6A58", primaryHex: "#F2913D", secondary: "\u5976\u767D", secondaryHex: "#FBF3E4", accent: "\u7126\u7CD6", accentHex: "#B5732B", family: ["\u6A59", "\u767D", "\u6A58", "\u6696"], note: "\u79CB\u5B63\u6821\u56ED\u8282/\u8FD4\u6821\u665A\u4F1A\u6E29\u6696\u6000\u65E7\u3002" }
    ]
  }
];
var UNIVERSAL_FORMATIONS = [
  { name: "\u6807\u51C6\u65B9\u9635\u5F0F", summary: "\u7B49\u884C\u7B49\u5217\u65B9\u9635,\u6A2A\u7AD6\u5BF9\u9F50\u659C\u7EBF\u6210\u884C", rows: 4, spacingRule: "\u6A2A\u7AD6\u95F4\u8DDD\u5747 80cm,\u56DB\u89D2\u5B9A\u70B9\u6821\u51C6", countRange: [9, 64], tips: "\u6700\u767E\u642D\u7684\u961F\u5F62,\u884C\u8FDB/\u9759\u6001\u7686\u5B9C;\u5148\u5B9A\u56DB\u89D2\u518D\u586B\u5185\u90E8\u3002", universal: true, tags: ["\u6574\u9F50", "\u6C14\u52BF", "\u884C\u8FDB", "\u56E2\u4F53"] },
  { name: "V\u5B57\u5C55\u5F00\u5F0F", summary: "\u4EE5\u4E2D\u5FC3\u70B9\u4E3A\u5C16\u5411\u4E24\u7FFC\u659C\u5411\u5C55\u5F00\u5448 V \u5F62", rows: 3, spacingRule: "\u659C\u7EBF\u4EBA\u8DDD 75cm,\u4E24\u7FFC\u5939\u89D2\u7EA6 60\xB0", countRange: [7, 35], tips: "\u5C16\u70B9\u7AD9\u6838\u5FC3\u6210\u5458;\u9002\u5408\u9AD8\u6F6E\u6BB5\u843D\u5411\u524D\u63A8\u8FDB\u3002", universal: true, tags: ["\u805A\u7126", "\u63A8\u8FDB", "\u9AD8\u6F6E", "\u9886\u821E"] },
  { name: "\u5012V\u96C1\u9635\u5F0F", summary: "\u5F00\u53E3\u671D\u89C2\u4F17\u7684\u5012 V,\u5982\u96C1\u7FA4\u5C55\u7FC5", rows: 3, spacingRule: "\u659C\u7EBF\u4EBA\u8DDD 75cm,\u5F00\u53E3\u5BBD\u5EA6\u7EA6\u53F0\u5BBD 2/3", countRange: [7, 35], tips: "\u4E24\u7FFC\u672B\u7AEF\u7559\u6700\u7075\u6D3B\u7684\u6210\u5458,\u4FBF\u4E8E\u53D8\u961F\u8854\u63A5\u3002", universal: true, tags: ["\u8212\u5C55", "\u5F00\u573A", "\u8FCE\u5BBE", "\u5927\u6C14"] },
  { name: "\u6247\u5F62\u8F90\u5C04\u5F0F", summary: "\u4EE5\u821E\u53F0\u524D\u4E2D\u4E3A\u5706\u5FC3\u5448\u6247\u9762\u5C55\u5F00", rows: 3, spacingRule: "\u5F27\u7EBF\u5F26\u8DDD 65cm,\u5C42\u95F4\u534A\u5F84\u5DEE 1m", countRange: [10, 40], tips: "\u6247\u5FC3\u53EF\u7AD9\u9886\u5531/\u9886\u821E;\u6536\u6247\u53D8\u6A2A\u6392\u662F\u7ECF\u5178\u53D8\u961F\u3002", universal: true, tags: ["\u73AF\u62B1", "\u67D4\u548C", "\u6292\u60C5", "\u805A\u62E2"] },
  { name: "\u83F1\u5F62\u5BF9\u79F0\u5F0F", summary: "\u5355\u4EBA\u5C16\u70B9\u3001\u4E2D\u6BB5\u6700\u5BBD\u7684\u83F1\u5F62\u5BF9\u79F0\u7AD9\u4F4D", rows: 5, spacingRule: "\u5BF9\u89D2\u7EBF\u95F4\u8DDD 80cm,\u4E2D\u8F74\u4E25\u683C\u5BF9\u79F0", countRange: [8, 30], tips: "\u89C6\u89C9\u7126\u70B9\u5F3A,\u9002\u5408\u72EC\u821E+\u7FA4\u821E\u5C42\u6B21;\u4EBA\u6570\u4EE5\u5947\u6570\u6392\u5E03\u66F4\u5BF9\u79F0\u3002", universal: true, tags: ["\u5BF9\u79F0", "\u7126\u70B9", "\u72EC\u9886", "\u5C42\u6B21"] },
  { name: "\u540C\u5FC3\u5706\u73AF\u5F0F", summary: "\u5185\u5916\u53CC\u5706\u73AF,\u53EF\u53CD\u5411\u65CB\u8F6C\u6D41\u52A8", rows: 2, spacingRule: "\u5185\u73AF\u534A\u5F84 1.5m,\u5916\u73AF\u534A\u5F84 3m,\u73AF\u4E0A\u7B49\u5206", countRange: [10, 36], tips: "\u65CB\u8F6C\u53D8\u961F\u89C2\u8D4F\u6027\u5F3A;\u6CE8\u610F\u5706\u5FC3\u5B9A\u4F4D\u53C2\u7167\u7269\u3002", universal: true, tags: ["\u6D41\u52A8", "\u65CB\u8F6C", "\u6B22\u5FEB", "\u6C11\u65CF"] },
  { name: "\u53CC\u6392\u9519\u843D\u5F0F(\u901A\u7528)", summary: "\u524D\u540E\u4E24\u6392\u534A\u80A9\u9519\u4F4D,\u540E\u6392\u5168\u90E8\u53EF\u89C1", rows: 2, spacingRule: "\u9519\u4F4D\u534A\u80A9\u4F4D,\u6392\u95F4 1m,\u5DE6\u53F3 70cm", countRange: [6, 28], tips: "\u5C0F\u4F53\u91CF\u8282\u76EE\u7684\u7A33\u59A5\u9009\u62E9;\u524D\u77EE\u540E\u9AD8\u3002", universal: true, tags: ["\u7B80\u6D01", "\u5C0F\u578B", "\u7A33\u59A5"] },
  { name: "\u659C\u7EBF\u7834\u683C\u5F0F", summary: "\u4E00\u6761\u8D2F\u7A7F\u821E\u53F0\u7684\u5BF9\u89D2\u659C\u7EBF,\u6253\u7834\u6A2A\u5E73\u7AD6\u76F4", rows: 1, spacingRule: "\u659C\u7EBF\u4EBA\u8DDD 90cm,\u9996\u5C3E\u5404\u8DDD\u53F0\u53E3/\u53F0\u4FA7 1m", countRange: [4, 16], tips: "\u9002\u5408\u53D9\u4E8B\u63A8\u8FDB\u3001\u4F9D\u6B21\u4EAE\u76F8\u7684\u6BB5\u843D\u3002", universal: true, tags: ["\u53D9\u4E8B", "\u4EAE\u76F8", "\u5148\u950B", "\u7EB5\u6DF1"] },
  { name: "\u5341\u5B57\u4EA4\u53C9\u5F0F", summary: "\u6A2A\u7AD6\u4E24\u5217\u5728\u53F0\u5FC3\u4EA4\u53C9\u6210\u5341\u5B57", rows: 3, spacingRule: "\u81C2\u95F4 70cm,\u4EA4\u53C9\u70B9\u7559 1m \u7A7A\u4F4D", countRange: [9, 25], tips: "\u4ECE\u5341\u5B57\u6563\u5F00\u4E3A\u65B9\u9635/\u5706\u5F62\u90FD\u5F88\u987A;\u4EA4\u53C9\u70B9\u662F\u5929\u7136 C \u4F4D\u3002", universal: true, tags: ["\u53D8\u961F", "\u67A2\u7EBD", "\u5BF9\u79F0"] },
  { name: "\u91D1\u5B57\u5854\u5C42\u53E0\u5F0F", summary: "\u524D\u5C11\u540E\u591A\u9010\u6392\u9012\u589E,\u5982\u91D1\u5B57\u5854\u526A\u5F71", rows: 4, spacingRule: "\u6BCF\u6392\u9012\u589E 2 \u4EBA,\u6392\u95F4 90cm,\u5DE6\u53F3 65cm", countRange: [10, 40], tips: "\u914D\u5408\u53F0\u9636\u6216\u9AD8\u4F4E\u9053\u5177\u6548\u679C\u66F4\u4F73;\u9876\u70B9\u7AD9\u6838\u5FC3\u3002", universal: true, tags: ["\u6C14\u52BF", "\u9012\u8FDB", "\u538B\u8F74", "\u5408\u5F71"] },
  // ===== 以下队形沉淀自 31 个真实演出视频的调研分析(StageOS 核心引擎 FORMATION_RULES)=====
  { name: "\u8DEA\u7AD9\u6DF7\u5408\u4E09\u5C42\u5F0F", summary: "\u524D\u6392\u8DEA\u5750 + \u4E2D\u540E\u6392\u7AD9\u7ACB\u7684\u4E09\u5C42\u9519\u843D\u7AD9\u4F4D", rows: 3, spacingRule: "\u524D\u6392\u8DEA\u5750\u95F4\u8DDD 50cm,\u4E2D\u540E\u6392\u7AD9\u7ACB\u5DE6\u53F3 60cm,\u6392\u95F4 80cm", countRange: [12, 36], tips: "\u5C0F\u5B66\u4F4E\u6BB5\u5408\u5531\u9AD8\u9891\u961F\u5F62;\u8DEA\u5750\u6392\u653E\u6700\u77EE\u7684\u5B69\u5B50,\u89C6\u89C9\u5C42\u6B21\u81EA\u7136\u62C9\u5F00\u4E14\u65E0\u9700\u53F0\u67B6\u3002", universal: true, tags: ["\u4F4E\u9F84", "\u5408\u5531", "\u5C42\u6B21", "\u7AE5\u8DA3", "\u5C0F\u5B66"] },
  { name: "\u524D\u4E09\u540E\u4E8C\u8E72\u7AD9\u5F0F", summary: "\u524D\u6392\u4E09\u5206\u4E4B\u4E8C\u8E72/\u8DEA + \u540E\u6392\u7AD9\u7ACB\u7684\u4E24\u5C42\u7D27\u51D1\u7AD9\u4F4D", rows: 2, spacingRule: "\u524D\u6392\u95F4\u8DDD 45cm,\u540E\u6392 60cm,\u6392\u95F4 70cm", countRange: [8, 20], tips: "\u5B66\u524D\u4E0E\u4F4E\u9F84\u8282\u76EE\u7684\u7A33\u59A5\u9009\u62E9;\u65E0\u961F\u5F62\u53D8\u6362,\u9760\u8868\u60C5\u4E0E\u8F7B\u5FAE\u6447\u6446\u6491\u573A\u3002", universal: true, tags: ["\u5B66\u524D", "\u4F4E\u9F84", "\u7B80\u6D01", "\u7A33\u59A5"] },
  { name: "\u5F27\u5F62\u9886\u8BF5\u5206\u533A\u5F0F", summary: "\u591A\u6392\u5F27\u5F62\u5408\u8BF5\u533A + \u72EC\u7ACB\u524D\u7F6E\u9886\u8BF5\u4F4D", rows: 3, spacingRule: "\u5F27\u7EBF\u5F26\u8DDD 60cm,\u6392\u95F4 85cm,\u9886\u8BF5\u4F4D\u8DDD\u9996\u6392 1.5m", countRange: [10, 40], tips: "\u6717\u8BF5\u7C7B\u8282\u76EE\u6807\u51C6\u961F\u5F62;\u9886\u8BF5\u72EC\u7ACB\u8D70\u4F4D,\u5408\u8BF5\u533A\u7EDF\u4E00\u671D\u5411,\u7537\u5973\u5DE6\u53F3\u5206\u533A\u66F4\u5229\u58F0\u90E8\u5E73\u8861\u3002", universal: true, tags: ["\u6717\u8BF5", "\u9886\u8BF5", "\u5F27\u5F62", "\u5206\u533A", "\u4EEA\u5F0F"] },
  { name: "\u53CC\u8272\u58F0\u90E8\u5206\u7EC4\u5F0F", summary: "\u6309\u58F0\u90E8/\u670D\u8272\u5206\u6210\u5DE6\u53F3\u4E24\u7EC4,\u9636\u68AF\u6392\u5E03", rows: 3, spacingRule: "\u7EC4\u5185\u5DE6\u53F3 55cm,\u4E24\u7EC4\u95F4\u7559 1m \u5206\u754C,\u9010\u6392\u589E\u9AD8 20cm", countRange: [24, 60], tips: "\u9AD8\u4E2D\u53CA\u4EE5\u4E0A\u5408\u5531\u9AD8\u9891\u961F\u5F62;\u4E24\u7EC4\u670D\u88C5\u7528\u649E\u8272\u6216\u6DF1\u6D45\u547C\u5E94,\u89C6\u89C9\u4E0E\u58F0\u90E8\u4E00\u4E3E\u4E24\u5F97\u3002", universal: true, tags: ["\u5408\u5531", "\u58F0\u90E8", "\u649E\u8272", "\u9AD8\u4E2D", "\u5927\u578B"] },
  { name: "\u68AF\u5F62\u9636\u68AF\u5408\u5531\u5F0F", summary: "\u4E0A\u7A84\u4E0B\u5BBD\u7684\u68AF\u5F62\u8F6E\u5ED3,\u9010\u6392\u589E\u9AD8\u7AD9\u4E0A\u53F0\u67B6", rows: 4, spacingRule: "\u5DE6\u53F3 55cm,\u9010\u6392\u589E\u9AD8 25cm,\u9996\u672B\u6392\u5BBD\u5EA6\u5DEE\u7EA6 1/4 \u53F0\u5BBD", countRange: [30, 80], tips: "\u4E2D\u5B66\u4EE5\u4E0A\u5927\u5408\u5531\u6807\u51C6\u961F\u5F62;\u9700\u5408\u5531\u53F0\u67B6,\u672B\u6392\u6CE8\u610F\u62A4\u680F,\u6307\u6325\u4E0E\u961F\u5F62\u4E2D\u8F74\u5BF9\u9F50\u3002", universal: true, tags: ["\u5408\u5531", "\u9636\u68AF", "\u6C14\u52BF", "\u5927\u578B", "\u6BD4\u8D5B"] },
  { name: "\u6247\u5F62\u58F0\u90E8\u6392\u5217\u5F0F", summary: "\u4EE5\u6307\u6325\u4E3A\u5706\u5FC3\u6247\u9762\u5C55\u5F00,\u6309\u4E50\uFFFD\uFFFD/\u58F0\u90E8\u5206\u533A", rows: 3, spacingRule: "\u5F27\u7EBF\u5F26\u8DDD 70cm,\u5C42\u95F4\u534A\u5F84\u5DEE 1.2m,\u58F0\u90E8\u95F4\u7559 80cm \u5206\u754C", countRange: [12, 50], tips: "\u5668\u4E50\u4E0E\u6C11\u4E50\u5408\u594F\u6807\u51C6\u961F\u5F62;\u9AD8\u97F3\u533A\u9760\u5916\u3001\u4F4E\u97F3\u533A\u9760\u5185,\u8C31\u67B6\u4E0E\u4EBA\u9519\u4F4D\u6446\u653E\u3002", universal: true, tags: ["\u5668\u4E50", "\u4E50\u56E2", "\u6247\u5F62", "\u58F0\u90E8"] },
  { name: "\u666F\u6DF1\u4E09\u533A\u620F\u5267\u5F0F", summary: "\u524D\u4E2D\u540E\u4E09\u4E2A\u8868\u6F14\u5206\u533A,\u6309\u573A\u666F\u5207\u6362\u8C03\u5EA6", rows: 3, spacingRule: "\u524D\u533A\u8DDD\u53F0\u53E3 1m,\u533A\u95F4\u7EB5\u6DF1\u5404\u7EA6 1/3 \u53F0\u6DF1,\u6A2A\uFFFD\uFFFD\u81EA\u7531", countRange: [6, 30], tips: "\u8BFE\u672C\u5267/\u620F\u5267\u901A\u7528;\u4E3B\u89D2\u8272\u5C45\u524D\u533A,\u7FA4\u6F14\u4E2D\u540E\u533A\u5019\u573A\u5F0F\u7AD9\u4F4D,\u914D\u5408\u706F\u5149\u5206\u533A\u5207\u6362\u573A\u666F\u3002", universal: true, tags: ["\u620F\u5267", "\u8BFE\u672C\u5267", "\u5206\u533A", "\u53D9\u4E8B", "\u8C03\u5EA6"] },
  { name: "\u73AF\u5F62\u9886\u5531\u73AF\u7ED5\u5F0F", summary: "\u7FA4\u4F53\u56F4\u6210\u5F00\u53E3\u73AF\u5F62,\u9886\u5531/\u72EC\u5531\u5C45\u73AF\u5FC3", rows: 2, spacingRule: "\u73AF\u4E0A\u7B49\u5206 65cm,\u73AF\u5FC3\u7559 2m \u8868\u6F14\u533A,\u5F00\u53E3\u671D\u89C2\u4F17", countRange: [12, 40], tips: "\u6709\u9886\u5531/\u72EC\u5531\u6BB5\u843D\u7684\u9AD8\u4E2D\u5408\u5531\u4E0E\u6C11\u65CF\u8282\u76EE\u5E38\u7528;\u73AF\u4F53\u53EF\u7F13\u6162\u6D41\u52A8\u589E\u5F3A\u4EEA\u5F0F\u611F\u3002", universal: true, tags: ["\u9886\u5531", "\u73AF\u5F62", "\u6C11\u65CF", "\u4EEA\u5F0F", "\u6D41\u52A8"] }
];
var COLOR_NAME_HEX = (() => {
  const map = {
    // 常用补充色(可能出现在用户自由输入的 screenThemeColor 中)
    \u7EA2: "#C8102E",
    \u7EA2\u8272: "#C8102E",
    \u5927\u7EA2: "#C8102E",
    \u84DD: "#2653C9",
    \u84DD\u8272: "#2653C9",
    \u5929\u84DD: "#87CEEB",
    \u6DF1\u84DD: "#1F3C88",
    \u7EFF: "#2E8B57",
    \u7EFF\u8272: "#2E8B57",
    \u58A8\u7EFF: "#3D5C4F",
    \u9EC4: "#FCD337",
    \u9EC4\u8272: "#FCD337",
    \u91D1\u9EC4: "#D4AF37",
    \u7D2B: "#4B2E83",
    \u7D2B\u8272: "#4B2E83",
    \u7C89: "#F7C9D4",
    \u7C89\u8272: "#F7C9D4",
    \u7C89\u7EA2: "#F4A7B9",
    \u6A59: "#FF8200",
    \u6A59\u8272: "#FF8200",
    \u767D: "#FFFFFF",
    \u767D\u8272: "#FFFFFF",
    \u9ED1: "#111111",
    \u9ED1\u8272: "#111111",
    \u7070: "#9CA3AF",
    \u7070\u8272: "#9CA3AF",
    \u91D1: "#D4AF37",
    \u91D1\u8272: "#D4AF37",
    \u94F6: "#C0C0C0",
    \u94F6\u8272: "#C0C0C0"
  };
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
function retrieveStageKnowledge(input) {
  const matchedBy = [];
  let profile = STAGE_KNOWLEDGE.find((k) => input.programType && k.programTypes.includes(input.programType));
  if (profile) {
    matchedBy.push(`\u8282\u76EE\u7C7B\u578B\u547D\u4E2D\u539F\u578B\u300C${profile.archetype}\u300D`);
  } else {
    profile = STAGE_KNOWLEDGE[STAGE_KNOWLEDGE.length - 1];
    matchedBy.push(`\u8282\u76EE\u7C7B\u578B\u672A\u547D\u4E2D,\u56DE\u9000\u539F\u578B\u300C${profile.archetype}\u300D`);
  }
  const seenNames = new Set(profile.formations.map((f) => f.name));
  const merged = [
    ...profile.formations,
    ...UNIVERSAL_FORMATIONS.filter((f) => !seenNames.has(f.name))
  ];
  let formations = merged;
  if (typeof input.performerCount === "number" && input.performerCount > 0) {
    const fit = merged.filter(
      (f) => input.performerCount >= f.countRange[0] && input.performerCount <= f.countRange[1]
    );
    if (fit.length > 0) {
      formations = fit;
      matchedBy.push(`\u4EBA\u6570 ${input.performerCount} \u8FC7\u6EE4\u51FA ${fit.length} \u5957\u9002\u914D\u961F\u5F62(\u542B\u901A\u7528\u961F\u5F62\u6C60)`);
    } else {
      matchedBy.push(`\u4EBA\u6570 ${input.performerCount} \u65E0\u7CBE\u786E\u533A\u95F4\u547D\u4E2D,\u8FD4\u56DE\u5168\u90E8\u961F\u5F62\u4F9B\u53C2\u8003`);
    }
  } else {
    matchedBy.push(`\u5408\u5E76\u901A\u7528\u961F\u5F62\u6C60\u540E\u5171 ${merged.length} \u5957\u961F\u5F62\u53EF\u9009`);
  }
  const formationThemeText = input.programTheme ?? "";
  const scoreFormation = (f) => (f.tags ?? []).reduce((n, t) => formationThemeText.includes(t) ? n + 1 : n, 0);
  formations = [...formations].sort((a, b) => {
    const diff = scoreFormation(b) - scoreFormation(a);
    if (diff !== 0) return diff;
    return (a.universal ? 1 : 0) - (b.universal ? 1 : 0);
  });
  if (formationThemeText.trim() && scoreFormation(formations[0]) > 0) {
    matchedBy.push(`\u8282\u76EE\u4E3B\u9898\u5339\u914D\u5230\u961F\u5F62\u300C${formations[0].name}\u300D\u4F18\u5148`);
  }
  const colorText = `${input.screenThemeColor ?? ""} ${input.programTheme ?? ""}`;
  const scorePalette = (p) => p.family.reduce((s, f) => colorText.includes(f) ? s + 1 : s, 0);
  const palettes = [...profile.palettes].sort((a, b) => scorePalette(b) - scorePalette(a));
  if (colorText.trim() && scorePalette(palettes[0]) > 0) {
    matchedBy.push(`\u4E3B\u9898\u8272/\u4E3B\u9898\u5339\u914D\u5230\u914D\u8272\u300C${palettes[0].name}\u300D\u4F18\u5148`);
  }
  const themeText = input.programTheme ?? "";
  const scoreStyle = (s) => s.moods.reduce((n, m) => themeText.includes(m) ? n + 1 : n, 0);
  const costumeStyles = [...profile.costumeStyles].sort((a, b) => scoreStyle(b) - scoreStyle(a));
  if (themeText.trim() && scoreStyle(costumeStyles[0]) > 0) {
    matchedBy.push(`\u8282\u76EE\u4E3B\u9898\u5339\u914D\u5230\u6B3E\u5F0F\u300C${costumeStyles[0].name}\u300D\u4F18\u5148`);
  }
  return { archetype: profile.archetype, formations, costumeStyles, palettes, matchedBy };
}

// supabase/functions/_shared/stage-scene-rules.ts
var LED_RULES = [
  {
    programKey: "\u5408\u5531",
    label: "\u5408\u5531\u7C7B",
    dynamicMode: "\u9759\u6001\u6216\u6781\u6162\u52A8\u6001(\u22641\u6B21/\u5206\u949F\u5207\u6362)",
    colorAdvice: "\u6D45\u84DD\u3001\u7070\u84DD\u3001\u661F\u7A7A\u84DD\u3001\u7C73\u767D\u5149\u5F71",
    contentAdvice: "\u661F\u7A7A\u3001\u4E91\u96FE\u3001\u6DE1\u5F69\u6E10\u53D8\u3001\u5408\u5531\u4E3B\u9898\u6587\u5B57",
    forbidden: "\u9AD8\u9891\u95EA\u70C1\u3001\u591A\u8272\u5FEB\u901F\u5207\u6362\u3001\u590D\u6742\u52A8\u753B"
  },
  {
    programKey: "\u821E\u8E48",
    label: "\u821E\u8E48\u7C7B",
    dynamicMode: "\u6162\u52A8\u6001(\u53EF\u4E0E\u821E\u8E48\u8282\u594F\u547C\u5E94,\u5EF6\u8FDF\u22642\u79D2)",
    colorAdvice: "\u4E0E\u670D\u88C5\u8272\u7CFB\u4E92\u8865\u6216\u540C\u7CFB\u4F4E\u9971\u548C",
    contentAdvice: "\u62BD\u8C61\u6E10\u53D8\u3001\u81EA\u7136\u5143\u7D20(\u4E91/\u6C34/\u5149)\u3001\u51E0\u4F55\u8272\u5757",
    forbidden: "\u5199\u5B9E\u98CE\u666F\u7167\u7247\u3001\u5361\u901A\u7D20\u6750\u3001\u9AD8\u9971\u548C\u8272\u5757",
    special: "\u821E\u8E48\u9AD8\u6F6E\u6BB5\u53EF\u77ED\u6682\u63D0\u4EAE,\u4F46\u4E0D\u8D85\u8FC7 2 \u79D2"
  },
  {
    programKey: "\u6717\u8BF5",
    label: "\u6717\u8BF5/\u60C5\u666F\u6717\u8BF5",
    dynamicMode: "\u9759\u6001\u80CC\u666F\u4E3A\u4E3B",
    colorAdvice: "\u6696\u7070\u3001\u7C73\u767D\u3001\u6DE1\u84DD\u3001\u7070\u91D1",
    contentAdvice: "\u4E3B\u9898\u76F8\u5173\u7684\u7B80\u6D01\u6587\u5B57/\u8BD7\u53E5/\u80CC\u666F\u610F\u8C61",
    forbidden: "\u4E0E\u6717\u8BF5\u5185\u5BB9\u65E0\u5173\u7684\u52A8\u6001\u753B\u9762",
    special: "\u53EF\u7528\u6781\u6162\u7684\u6587\u5B57\u6DE1\u5165\u6DE1\u51FA"
  },
  {
    programKey: "\u5668\u4E50",
    label: "\u5668\u4E50\u5408\u594F",
    dynamicMode: "\u5B8C\u5168\u9759\u6001",
    colorAdvice: "\u6DF1\u84DD\u3001\u58A8\u7EFF\u3001\u6697\u91D1\u3001\u6696\u7070",
    contentAdvice: "\u97F3\u4E50\u5385\u98CE\u683C\u6DF1\u8272\u80CC\u666F\u3001\u4E50\u5668\u526A\u5F71",
    forbidden: "\u4EFB\u4F55\u52A8\u6001\u753B\u9762\u3001\u6587\u5B57\u5F39\u5E55"
  },
  {
    programKey: "\u601D\u653F|\u7EA2\u8272|\u7231\u56FD",
    label: "\u601D\u653F/\u7EA2\u8272\u4E3B\u9898",
    dynamicMode: "\u6162\u52A8\u6001,\u753B\u9762\u8FC7\u6E21\u22653\u79D2",
    colorAdvice: "\u84DD\u5929\u3001\u7EA2\u65D7\u3001\u5C71\u6CB3\u3001\u5149\u675F",
    contentAdvice: "\u56FD\u65D7\u3001\u5C71\u6CB3\u3001\u5386\u53F2\u5F71\u50CF(\u9759\u6001)",
    forbidden: "\u5927\u7EA2\u6EE1\u5C4F + \u5927\u7EA2\u670D\u88C5\u540C\u65F6\u51FA\u73B0",
    special: "\u670D\u88C5\u4EE5\u767D\u8272\u4E3A\u4E3B\u3001\u7EA2\u8272\u4E3A\u70B9\u7F00"
  },
  {
    programKey: "\u513F\u7AE5|\u7AE5\u8BDD|\u4F4E\u6BB5|\u5B66\u524D",
    label: "\u513F\u7AE5\u8282\u76EE",
    dynamicMode: "\u6162\u52A8\u6001,\u5207\u6362\u22655\u79D2",
    colorAdvice: "\u6D45\u84DD\u5929\u7A7A\u3001\u4E91\u6735\u3001\u67D4\u548C\u6E10\u53D8",
    contentAdvice: "\u7AE5\u8BDD\u5143\u7D20\u3001\u8349\u5730\u3001\u661F\u7A7A\u3001\u5F69\u8679(\u4F4E\u9971\u548C)",
    forbidden: "\u9AD8\u9971\u548C\u5361\u901A\u7D20\u6750\u5806\u6EE1\u5C4F\u3001\u9AD8\u9891\u95EA\u70C1\u3001\u9AD8\u4EAE\u767D\u5C4F"
  }
];
var FORMATION_SAFETY = [
  {
    programKey: "\u5408\u5531",
    label: "\u5408\u5531",
    bestCount: [30, 45],
    maxCount: 60,
    overflowStrategy: "\u5206\u58F0\u90E8\u7AD9\u4F4D + \u5408\u5531\u53F0",
    safety: ["\u5408\u5531\u53F0\u6BCF\u7EA7\u9AD8\u5EA6\u5DEE\u226520cm", "\u524D\u540E\u6392\u95F4\u8DDD\u226580cm", "\u94A2\u7434\u4F4D\u5728\u821E\u53F0\u5DE6\u524D 1/4 \u5904", "\u6307\u6325\u4F4D\u5728 C \u4F4D\u6B63\u524D\u65B9"]
  },
  {
    programKey: "\u821E\u8E48|\u8857\u821E|\u5566\u5566",
    label: "\u821E\u8E48(\u7FA4\u821E)",
    bestCount: [6, 28],
    maxCount: 42,
    overflowStrategy: "\u5206\u7EC4\u5206\u533A + \u5B89\u5168\u901A\u9053",
    safety: ["C \u4F4D\u524D\u65B9\u52A8\u4F5C\u534A\u5F84\u22651.5m", "\u7D27\u5BC6\u578B\u95F4\u8DDD\u22650.8m / \u8212\u5C55\u578B\u22651.2m / \u5927\u5E45\u5EA6\u52A8\u4F5C\u22651.5m", "\u7981\u6B62\u4FEF\u89C6\u56FE\u6848\u578B\u961F\u5F62(\u89C2\u4F17\u5E73\u89C6\u770B\u4E0D\u5230)"]
  },
  {
    programKey: "\u6717\u8BF5",
    label: "\u6717\u8BF5/\u60C5\u666F\u6717\u8BF5",
    bestCount: [8, 24],
    maxCount: 36,
    overflowStrategy: "\u524D\u540E\u5206\u5C42 + \u9EA6\u514B\u98CE\u4F4D",
    safety: ["\u9EA6\u514B\u98CE\u4F4D\u5FC5\u987B\u9884\u7559", "\u6717\u8BF5\u8005\u9762\u90E8\u671D\u5411\u6B63\u9762\u4E3B\u673A\u4F4D", "\u80CC\u666F\u4EBA\u5458\u4E0D\u5F97\u6709\u5927\u5E45\u5EA6\u52A8\u4F5C"]
  },
  {
    programKey: "\u5668\u4E50|\u4E50\u5668|\u5408\u594F",
    label: "\u5668\u4E50\u5408\u594F",
    bestCount: [8, 30],
    maxCount: 50,
    overflowStrategy: "\u5206\u6392 + \u8C31\u67B6\u95F4\u8DDD",
    safety: ["\u8C31\u67B6\u95F4\u8DDD\u226560cm \u4E14\u4E0D\u906E\u6321\u540E\u6392\u9762\u90E8", "\u5927\u578B\u4E50\u5668(\u5B9A\u97F3\u9F13/\u7AD6\u7434)\u56FA\u5B9A\u540E\u533A", "\u72EC\u594F\u4F4D\u79FB\u81F3\u524D\u533A\u65F6\u9700\u9884\u7559\u901A\u9053"]
  },
  {
    programKey: "\u601D\u653F|\u7EA2\u8272|\u7231\u56FD",
    label: "\u601D\u653F\u7C7B\u8282\u76EE",
    bestCount: [12, 36],
    maxCount: 48,
    overflowStrategy: "\u5DE6\u4E2D\u53F3\u4E09\u5206\u533A",
    safety: ["\u7EA2\u8272\u4E3B\u9898\u670D\u88C5\u907F\u514D\u5927\u7EA2\u914D\u5927\u7EA2\u5C4F"]
  },
  {
    programKey: "\u60C5\u666F\u5267|\u8BFE\u672C\u5267|\u620F\u5267|\u8BDD\u5267",
    label: "\u60C5\u666F\u5267/\u8BFE\u672C\u5267",
    bestCount: [6, 20],
    maxCount: 30,
    overflowStrategy: "\u5206\u5E55\u8F6E\u6362",
    safety: ["\u9053\u5177\u4E0D\u8D85\u8FC7\u4EBA\u4F53 1/3 \u5927\u5C0F"]
  }
];
var TRANSITION_RULES = [
  "\u5355\u6B21\u6700\u5927\u79FB\u52A8\u8DDD\u79BB \u22643m,\u8D85\u8FC7\u9700\u5206\u6B65",
  "\u6700\u77ED\u53D8\u6362\u65F6\u95F4 \u22658 \u79D2(\u542B\u8D70\u4F4D+\u5B9A\u4F4D)",
  "40 \u4EBA\u4EE5\u4E0A\u5FC5\u987B\u4FDD\u7559 \u22651.2m \u5BBD\u5B89\u5168\u901A\u9053",
  "\u5206\u7EC4\u9519\u5CF0 0.3-0.5 \u79D2,\u907F\u514D\u8DEF\u5F84\u4EA4\u53C9"
];
var INDOOR_THEATER_CONSTRAINTS = [
  "\u4EBA\u7269\u6C38\u8FDC\u662F\u7B2C\u4E00\u4E3B\u4F53,LED \u53EA\u8D1F\u8D23\u6258\u4F4F\u6C1B\u56F4",
  "\u907F\u514D\u5168\u9ED1\u3001\u6DF1\u84DD\u3001\u6DF1\u7D2B\u670D\u88C5(\u4F1A\u88AB\u9ED1\u8272\u4FA7\u5E55\u541E\u6CA1)",
  "\u670D\u88C5\u4E0E LED \u80CC\u666F\u5FC5\u987B\u5F62\u6210\u660E\u5EA6\u5DEE(\u80CC\u666F\u66F4\u865A\u3001\u4EBA\u7269\u66F4\u5B9E)",
  "\u7981\u6B62\u5927\u7EA2\u8863\u914D\u5927\u7EA2\u5C4F",
  "LED \u4EAE\u5EA6\u4E0D\u5F97\u9AD8\u4E8E\u4EBA\u7269\u9762\u5149\u4EAE\u5EA6(\u2264\u9762\u5149 80%)",
  "LED \u767D\u8272\u9762\u79EF\u8D85\u8FC7 30% \u65F6\u9700\u8B66\u544A",
  "\u961F\u5F62\u5FC5\u987B\u670D\u52A1\u6B63\u9762\u89C2\u770B,\u4E0D\u4F9D\u8D56\u4FEF\u89C6\u56FE\u6848",
  "\u53CD\u5149\u5730\u9762\u4F1A\u9020\u6210\u670D\u88C5\u8272\u5DEE,\u6D45\u8272\u88D9\u88C5\u614E\u9009\u9AD8\u53CD\u5149\u9762\u6599"
];
function retrieveSceneRules(programType, programTheme = "", performerCount = 0) {
  const text = `${programType} ${programTheme}`;
  const matchKey = (key) => key.split("|").some((k) => text.includes(k));
  const ledRule = LED_RULES.find((r) => matchKey(r.programKey)) ?? null;
  const formationRule = FORMATION_SAFETY.find((r) => matchKey(r.programKey)) ?? null;
  const crowdNotes = [];
  if (performerCount >= 30) crowdNotes.push("30 \u4EBA\u4EE5\u4E0A\u5FC5\u987B\u5206\u5C42\u6216\u5206\u533A");
  if (performerCount >= 40) crowdNotes.push("40 \u4EBA\u4EE5\u4E0A\u5FC5\u987B\u4FDD\u7559\u5DE6\u53F3\u5B89\u5168\u901A\u9053(\u22651.2m)");
  if (formationRule && performerCount > formationRule.maxCount) {
    crowdNotes.push(
      `\u4EBA\u6570 ${performerCount} \u5DF2\u8D85\u8FC7${formationRule.label}\u4E0A\u9650 ${formationRule.maxCount},\u9700${formationRule.overflowStrategy}`
    );
  }
  return { ledRule, formationRule, constraints: INDOOR_THEATER_CONSTRAINTS, transitions: TRANSITION_RULES, crowdNotes };
}

// supabase/functions/render-photo/index.ts
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};
function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
function reject(code, message, status) {
  return json({ ok: false, code, message }, status);
}
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return reject("METHOD_NOT_ALLOWED", "\u4EC5\u652F\u6301 POST\u3002", 405);
  try {
    const body = await req.json().catch(() => ({}));
    if (body?.healthcheck === true) return json({ ok: true, code: "RENDER_HEALTHCHECK_OK" });
    const projectId = body?.projectId;
    const UUID_RE = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!projectId || !UUID_RE.test(projectId)) return reject("BAD_REQUEST", "projectId \u5FC5\u586B\u4E14\u9700\u4E3A uuid\u3002", 400);
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return reject("UNAUTHORIZED", "\u8BF7\u5148\u767B\u5F55\u540E\u518D\u6E32\u67D3\u3002", 401);
    const jwt = authHeader.slice("Bearer ".length);
    const anon = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_ANON_KEY"));
    const { data: userData, error: uErr } = await anon.auth.getUser(jwt);
    if (uErr || !userData?.user) return reject("UNAUTHORIZED", "\u767B\u5F55\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55\u3002", 401);
    const uid = userData.user.id;
    const svc = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
    const { data: project, error: pErr } = await svc.from("projects").select("id, user_id, title").eq("id", projectId).maybeSingle();
    if (pErr) throw pErr;
    if (!project || project.user_id !== uid) return reject("FORBIDDEN", "\u65E0\u6743\u8BBF\u95EE\u8BE5\u9879\u76EE\u3002", 403);
    const { data: confirmed, error: cErr } = await svc.from("confirmation_records").select("id").eq("project_id", projectId).eq("status", "confirmed").order("confirmed_at", { ascending: false }).limit(1);
    if (cErr) throw cErr;
    if (!confirmed || confirmed.length === 0) {
      return reject("CONFIRMATION_REQUIRED", "\u8BF7\u5148\u5B8C\u6210\u7528\u6237\u786E\u8BA4\u540E\u518D\u6E32\u67D3\u6548\u679C\u56FE\u3002", 403);
    }
    const { data: si, error: siErr } = await svc.from("stage_inputs").select("data").eq("project_id", projectId).maybeSingle();
    if (siErr) throw siErr;
    const input = si?.data ?? {};
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) return reject("AI_NOT_CONFIGURED", "AI \u63A5\u53E3\u672A\u914D\u7F6E(\u7F3A\u5C11 GEMINI_API_KEY)\u3002", 503);
    const retrieval = retrieveStageKnowledge({
      programType: input.programType,
      performerCount: input.performerCount,
      screenThemeColor: input.screenThemeColor,
      programTheme: input.programTheme
    });
    const formation = retrieval.formations[0];
    const preset = retrievePresets(input.programType ?? "", input.programTheme ?? "", 1)[0];
    const scene = retrieveSceneRules(input.programType ?? "", input.programTheme ?? "", input.performerCount ?? 0);
    const led = scene.ledRules[0];
    const paletteDesc = preset ? `\u914D\u8272\u91C7\u7528\u4E2D\u56FD\u4F20\u7EDF\u8272\u300C${preset.name}\u300D:${preset.colors.map((c) => `${c.name_zh}(${c.hex})`).join("\u3001")}` : `\u4E3B\u8272\u8C03\u4E3A ${input.screenThemeColor ?? "\u6696\u91D1\u8272"}`;
    const formationDesc = formation ? `${input.performerCount ?? 20} \u540D\u5B66\u751F\u6309\u300C${formation.name}\u300D\u961F\u5F62\u7AD9\u4F4D(${formation.summary})` : `${input.performerCount ?? 20} \u540D\u5B66\u751F\u6574\u9F50\u7AD9\u4F4D`;
    const ledDesc = led ? `LED \u5927\u5C4F\u663E\u793A${led.tone},${led.dynamicMode}` : "LED \u5927\u5C4F\u663E\u793A\u67D4\u548C\u6E10\u53D8\u80CC\u666F";
    const prompt = [
      `\u6821\u56ED${input.programType ?? "\u6587\u827A"}\u6F14\u51FA\u821E\u53F0\u6548\u679C\u56FE,\u5BA4\u5185\u5267\u573A,\u6696\u6728\u8272\u821E\u53F0\u5730\u677F,\u4E3B\u9898\u300C${input.programTheme ?? "\u9752\u6625"}\u300D\u3002`,
      formationDesc + "\u3002",
      paletteDesc + "\u3002",
      ledDesc + "\u3002",
      "\u4E13\u4E1A\u821E\u53F0\u706F\u5149(\u9762\u5149+\u4FA7\u5149+\u9876\u5149),\u89C2\u4F17\u5E2D\u89C6\u89D2,\u5199\u5B9E\u6444\u5F71\u98CE\u683C,16:9 \u5BBD\u5E45,\u65E0\u6587\u5B57\u6C34\u5370\u3002"
    ].join(" ");
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
      {
        method: "POST",
        headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ["IMAGE", "TEXT"] }
        })
      }
    );
    if (!res.ok) {
      const errText = await res.text();
      console.error("[render-photo] gemini error:", res.status, errText.slice(0, 300));
      if (res.status === 429) return reject("RATE_LIMITED", "\u6E32\u67D3\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002", 429);
      if (res.status === 402 || res.status === 403) return reject("CREDITS_EXHAUSTED", "AI \u989D\u5EA6\u4E0D\u8DB3\u6216\u5BC6\u94A5\u65E0\u6548\u3002", 402);
      return reject("AI_ERROR", "\u56FE\u50CF\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002", 502);
    }
    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const img = parts.find((p) => p.inlineData?.data);
    if (!img?.inlineData?.data) return reject("AI_EMPTY", "\u6A21\u578B\u672A\u8FD4\u56DE\u56FE\u50CF\uFF0C\u8BF7\u91CD\u8BD5\u3002", 502);
    const imageUrl = `data:${img.inlineData.mimeType ?? "image/png"};base64,${img.inlineData.data}`;
    return json({ ok: true, image: imageUrl, prompt });
  } catch (e) {
    console.error("[render-photo] error:", e instanceof Error ? e.message : String(e));
    return reject("INTERNAL", "\u6E32\u67D3\u670D\u52A1\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002", 500);
  }
});
