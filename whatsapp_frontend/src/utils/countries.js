const countries = [
    {
        "name": "Afganistán",
        "dialCode": "+93",
        "isoCode": "AF",
        "flag": "https://flagcdn.com/w40/af.png",
        "example": "070 123 4567"
    },
    {
        "name": "Islas Åland",
        "dialCode": "+358",
        "isoCode": "AX",
        "flag": "https://flagcdn.com/w40/ax.png",
        "example": "041 2345678"
    },
    {
        "name": "Albania",
        "dialCode": "+355",
        "isoCode": "AL",
        "flag": "https://flagcdn.com/w40/al.png",
        "example": "066 123 4567"
    },
    {
        "name": "Argelia",
        "dialCode": "+213",
        "isoCode": "DZ",
        "flag": "https://flagcdn.com/w40/dz.png",
        "example": "0551 23 45 67"
    },
    {
        "name": "Samoa Americana",
        "dialCode": "+1684",
        "isoCode": "AS",
        "flag": "https://flagcdn.com/w40/as.png",
        "example": "(684) 733-1234"
    },
    {
        "name": "Andorra",
        "dialCode": "+376",
        "isoCode": "AD",
        "flag": "https://flagcdn.com/w40/ad.png",
        "example": "312 345"
    },
    {
        "name": "Angola",
        "dialCode": "+244",
        "isoCode": "AO",
        "flag": "https://flagcdn.com/w40/ao.png",
        "example": "923 123 456"
    },
    {
        "name": "Anguila",
        "dialCode": "+1264",
        "isoCode": "AI",
        "flag": "https://flagcdn.com/w40/ai.png",
        "example": "(264) 235-1234"
    },
    {
        "name": "Antártida",
        "dialCode": "+672",
        "isoCode": "AQ",
        "flag": "https://flagcdn.com/w40/aq.png",
        "example": "10 1234"
    },
    {
        "name": "Antigua y Barbuda",
        "dialCode": "+1268",
        "isoCode": "AG",
        "flag": "https://flagcdn.com/w40/ag.png",
        "example": "(268) 464-1234"
    },
    {
        "name": "Argentina",
        "dialCode": "+54",
        "isoCode": "AR",
        "flag": "https://flagcdn.com/w40/ar.png",
        "example": "11 2345-6789"
    },
    {
        "name": "Armenia",
        "dialCode": "+374",
        "isoCode": "AM",
        "flag": "https://flagcdn.com/w40/am.png",
        "example": "077 123456"
    },
    {
        "name": "Aruba",
        "dialCode": "+297",
        "isoCode": "AW",
        "flag": "https://flagcdn.com/w40/aw.png",
        "example": "560 1234"
    },
    {
        "name": "Isla Ascensión",
        "dialCode": "+247",
        "isoCode": "AC",
        "flag": "https://flagcdn.com/w40/ac.png",
        "example": "7000"
    },
    {
        "name": "Australia",
        "dialCode": "+61",
        "isoCode": "AU",
        "flag": "https://flagcdn.com/w40/au.png",
        "example": "0412 345 678"
    },
    {
        "name": "Austria",
        "dialCode": "+43",
        "isoCode": "AT",
        "flag": "https://flagcdn.com/w40/at.png",
        "example": "0664 123456"
    },
    {
        "name": "Azerbaiyán",
        "dialCode": "+994",
        "isoCode": "AZ",
        "flag": "https://flagcdn.com/w40/az.png",
        "example": "040 123 45 67"
    },
    {
        "name": "Bahamas",
        "dialCode": "+1242",
        "isoCode": "BS",
        "flag": "https://flagcdn.com/w40/bs.png",
        "example": "(242) 359-1234"
    },
    {
        "name": "Bahréin",
        "dialCode": "+973",
        "isoCode": "BH",
        "flag": "https://flagcdn.com/w40/bh.png",
        "example": "3600 1234"
    },
    {
        "name": "Bangladés",
        "dialCode": "+880",
        "isoCode": "BD",
        "flag": "https://flagcdn.com/w40/bd.png",
        "example": "01812-345678"
    },
    {
        name: "Barbados",
        dialCode: "+1246",
        isoCode: "BB",
        flag: "https://flagcdn.com/w40/bb.png",
        example: "(246) 250-1234"
    },
    {
        name: "Bielorrusia",
        dialCode: "+375",
        isoCode: "BY",
        flag: "https://flagcdn.com/w40/bv.png",
        example: "029 123-45-67"
    },
    {
        name: "Bélgica",
        dialCode: "+32",
        isoCode: "BE",
        flag: "https://flagcdn.com/w40/be.png",
        example: "0470 12 34 56"
    },
    {
        name: "Belice",
        dialCode: "+501",
        isoCode: "BZ",
        flag: "https://flagcdn.com/w40/bz.png",
        example: "622-1234"
    },
    {
        name: "Benín",
        dialCode: "+229",
        isoCode: "BJ",
        flag: "https://flagcdn.com/w40/bj.png",
        example: "90 01 23 45"
    },
    {
        name: "Bermudas",
        dialCode: "+1441",
        isoCode: "BM",
        flag: "https://flagcdn.com/w40/bm.png",
        example: "(441) 370-1234"
    },
    {
        name: "Bután",
        dialCode: "+975",
        isoCode: "BT",
        flag: "https://flagcdn.com/w40/bt.png",
        example: "17 12 3456"
    },
    {
        name: "Bolivia",
        dialCode: "+591",
        isoCode: "BO",
        flag: "https://flagcdn.com/w40/bo.png",
        example: "71234567"
    },
    {
        name: "Bosnia y Herzegovina",
        dialCode: "+387",
        isoCode: "BA",
        flag: "https://flagcdn.com/w40/ba.png",
        example: "061 123 456"
    },
    {
        name: "Botsuana",
        dialCode: "+267",
        isoCode: "BW",
        flag: "https://flagcdn.com/w40/bw.png",
        example: "71 123 456"
    },
    {
        name: "Brasil",
        dialCode: "+55",
        isoCode: "BR",
        flag: "https://flagcdn.com/w40/br.png",
        example: "(11) 91234-5678"
    },
    {
        name: "Territorio Británico del Océano Índico",
        dialCode: "+246",
        isoCode: "IO",
        flag: "https://flagcdn.com/w40/io.png",
        example: "380 1234"
    },
    {
        name: "Brunéi Darussalam",
        dialCode: "+673",
        isoCode: "BN",
        flag: "https://flagcdn.com/w40/bn.png",
        example: "712 3456"
    },
    {
        name: "Bulgaria",
        dialCode: "+359",
        isoCode: "BG",
        flag: "https://flagcdn.com/w40/bg.png",
        example: "088 123 4567"
    },
    {
        name: "Burkina Faso",
        dialCode: "+226",
        isoCode: "BF",
        flag: "https://flagcdn.com/w40/bf.png",
        example: "70 12 34 56"
    },
    {
        name: "Burundi",
        dialCode: "+257",
        isoCode: "BI",
        flag: "https://flagcdn.com/w40/bi.png",
        example: "79 123 456"
    },
    {
        name: "Camboya",
        dialCode: "+855",
        isoCode: "KH",
        flag: "https://flagcdn.com/w40/kh.png",
        example: "092 123 456"
    },
    {
        name: "Camerún",
        dialCode: "+237",
        isoCode: "CM",
        flag: "https://flagcdn.com/w40/cm.png",
        example: "6 71 23 45 67"
    },
    {
        name: "Canadá",
        dialCode: "+1",
        isoCode: "CA",
        flag: "https://flagcdn.com/w40/ca.png",
        example: "(416) 123-4567"
    },
    {
        name: "Cabo Verde",
        dialCode: "+238",
        isoCode: "CV",
        flag: "https://flagcdn.com/w40/cv.png",
        example: "991 12 34"
    },
    {
        name: "Islas Caimán",
        dialCode: "+1345",
        isoCode: "KY",
        flag: "https://flagcdn.com/w40/ky.png",
        example: "(345) 926-1234"
    },
    {
        name: "República Centroafricana",
        dialCode: "+236",
        isoCode: "CF",
        flag: "https://flagcdn.com/w40/cf.png",
        example: "70 12 34 56"
    },
    {
        name: "Chad",
        dialCode: "+235",
        isoCode: "TD",
        flag: "https://flagcdn.com/w40/td.png",
        example: "63 12 34 56"
    },
    {
        name: "Chile",
        dialCode: "+56",
        isoCode: "CL",
        flag: "https://flagcdn.com/w40/cl.png",
        example: "9 9123 4567"
    },
    {
        name: "China",
        dialCode: "+86",
        isoCode: "CN",
        flag: "https://flagcdn.com/w40/cn.png",
        example: "138 1234 5678"
    },
    {
        name: "Isla de Navidad",
        dialCode: "+61",
        isoCode: "CX",
        flag: "https://flagcdn.com/w40/cx.png",
        example: "0412 345 678"
    },
    {
        name: "Islas Cocos (Keeling)",
        dialCode: "+61",
        isoCode: "CC",
        flag: "https://flagcdn.com/w40/cc.png",
        example: "0412 345 678"
    },
    {
        name: "Colombia",
        dialCode: "+57",
        isoCode: "CO",
        flag: "https://flagcdn.com/w40/co.png",
        example: "301 1234567"
    },
    {
        name: "Comoras",
        dialCode: "+269",
        isoCode: "KM",
        flag: "https://flagcdn.com/w40/km.png",
        example: "321 23 45"
    },
    {
        name: "Congo",
        dialCode: "+242",
        isoCode: "CG",
        flag: "https://flagcdn.com/w40/cg.png",
        example: "06 123 4567"
    },
    {
        name: "Islas Cook",
        dialCode: "+682",
        isoCode: "CK",
        flag: "https://flagcdn.com/w40/ck.png",
        example: "21 234"
    },
    {
        name: "Costa Rica",
        dialCode: "+506",
        isoCode: "CR",
        flag: "https://flagcdn.com/w40/cr.png",
        example: "8312 3456"
    },
    {
        name: "Croacia",
        dialCode: "+385",
        isoCode: "HR",
        flag: "https://flagcdn.com/w40/hr.png",
        example: "091 123 4567"
    },
    {
        name: "Cuba",
        dialCode: "+53",
        isoCode: "CU",
        flag: "https://flagcdn.com/w40/cu.png",
        example: "05 123 4567"
    },
    {
        name: "Chipre",
        dialCode: "+357",
        isoCode: "CY",
        flag: "https://flagcdn.com/w40/cy.png",
        example: "96 123456"
    },
    {
        name: "República Checa",
        dialCode: "+420",
        isoCode: "CZ",
        flag: "https://flagcdn.com/w40/cz.png",
        example: "601 123 456"
    },
    {
        name: "República Democrática del Congo",
        dialCode: "+243",
        isoCode: "CD",
        flag: "https://flagcdn.com/w40/cd.png",
        example: "099 123 4567"
    },
    {
        name: "Dinamarca",
        dialCode: "+45",
        isoCode: "DK",
        flag: "https://flagcdn.com/w40/dk.png",
        example: "21 23 45 67"
    },
    {
        name: "Yibuti",
        dialCode: "+253",
        isoCode: "DJ",
        flag: "https://flagcdn.com/w40/dj.png",
        example: "77 12 34 56"
    },
    {
        name: "Dominica",
        dialCode: "+1767",
        isoCode: "DM",
        flag: "https://flagcdn.com/w40/dm.png",
        example: "(767) 225-1234"
    },
    {
        name: "República Dominicana",
        dialCode: "+1849",
        isoCode: "DO",
        flag: "https://flagcdn.com/w40/do.png",
        example: "(849) 555-1234"
    },
    {
        name: "Ecuador",
        dialCode: "+593",
        isoCode: "EC",
        flag: "https://flagcdn.com/w40/ec.png",
        example: "099 123 4567"
    },
    {
        name: "Egipto",
        dialCode: "+20",
        isoCode: "EG",
        flag: "https://flagcdn.com/w40/eg.png",
        example: "0100 123 4567"
    },
    {
        name: "El Salvador",
        dialCode: "+503",
        isoCode: "SV",
        flag: "https://flagcdn.com/w40/sv.png",
        example: "7012 3456"
    },
    {
        name: "Guinea Ecuatorial",
        dialCode: "+240",
        isoCode: "GQ",
        flag: "https://flagcdn.com/w40/gq.png",
        example: "222 123 456"
    },
    {
        name: "Eritrea",
        dialCode: "+291",
        isoCode: "ER",
        flag: "https://flagcdn.com/w40/er.png",
        example: "07 123 456"
    },
    {
        name: "Estonia",
        dialCode: "+372",
        isoCode: "EE",
        flag: "https://flagcdn.com/w40/ee.png",
        example: "5123 4567"
    },
    {
        name: "Esuatini",
        dialCode: "+268",
        isoCode: "SZ",
        flag: "https://flagcdn.com/w40/sz.png",
        example: "7612 3456"
    },
    {
        name: "Etiopía",
        dialCode: "+251",
        isoCode: "ET",
        flag: "https://flagcdn.com/w40/et.png",
        example: "091 123 4567"
    },
    {
        name: "Islas Malvinas (Falkland)",
        dialCode: "+500",
        isoCode: "FK",
        flag: "https://flagcdn.com/w40/fk.png",
        example: "51234"
    },
    {
        name: "Islas Feroe",
        dialCode: "+298",
        isoCode: "FO",
        flag: "https://flagcdn.com/w40/fo.png",
        example: "211234"
    },
    {
        name: "Fiyi",
        dialCode: "+679",
        isoCode: "FJ",
        flag: "https://flagcdn.com/w40/fj.png",
        example: "701 2345"
    },
    {
        name: "Finlandia",
        dialCode: "+358",
        isoCode: "FI",
        flag: "https://flagcdn.com/w40/fi.png",
        example: "041 2345678"
    },
    {
        name: "Francia",
        dialCode: "+33",
        isoCode: "FR",
        flag: "https://flagcdn.com/w40/fr.png",
        example: "06 12 34 56 78"
    },
    {
        name: "Guayana Francesa",
        dialCode: "+594",
        isoCode: "GF",
        flag: "https://flagcdn.com/w40/gf.png",
        example: "0694 12 34 56"
    },
    {
        name: "Polinesia Francesa",
        dialCode: "+689",
        isoCode: "PF",
        flag: "https://flagcdn.com/w40/pf.png",
        example: "87 12 34 56"
    },
    {
        name: "Gabón",
        dialCode: "+241",
        isoCode: "GA",
        flag: "https://flagcdn.com/w40/ga.png",
        example: "06 03 12 34"
    },
    {
        name: "Gambia",
        dialCode: "+220",
        isoCode: "GM",
        flag: "https://flagcdn.com/w40/gm.png",
        example: "7012345"
    },
    {
        name: "Georgia",
        dialCode: "+995",
        isoCode: "GE",
        flag: "https://flagcdn.com/w40/ge.png",
        example: "595 12 34 56"
    },
    {
        name: "Alemania",
        dialCode: "+49",
        isoCode: "DE",
        flag: "https://flagcdn.com/w40/de.png",
        example: "0151 23456789"
    },
    {
        name: "Ghana",
        dialCode: "+233",
        isoCode: "GH",
        flag: "https://flagcdn.com/w40/gh.png",
        example: "024 123 4567"
    },
    {
        name: "Gibraltar",
        dialCode: "+350",
        isoCode: "GI",
        flag: "https://flagcdn.com/w40/gi.png",
        example: "54001234"
    },
    {
        name: "Grecia",
        dialCode: "+30",
        isoCode: "GR",
        flag: "https://flagcdn.com/w40/gr.png",
        example: "691 234 5678"
    },
    {
        name: "Groenlandia",
        dialCode: "+299",
        isoCode: "GL",
        flag: "https://flagcdn.com/w40/gl.png",
        example: "22 12 34"
    },
    {
        name: "Granada",
        dialCode: "+1473",
        isoCode: "GD",
        flag: "https://flagcdn.com/w40/gd.png",
        example: "(473) 403-1234"
    },
    {
        name: "Guadalupe",
        dialCode: "+590",
        isoCode: "GP",
        flag: "https://flagcdn.com/w40/gp.png",
        example: "0690 12 34 56"
    },
    {
        name: "Guam",
        dialCode: "+1671",
        isoCode: "GU",
        flag: "https://flagcdn.com/w40/gu.png",
        example: "(671) 788-1234"
    },
    {
        name: "Guatemala",
        dialCode: "+502",
        isoCode: "GT",
        flag: "https://flagcdn.com/w40/gt.png",
        example: "5123 4567"
    },
    {
        name: "Guernsey",
        dialCode: "+44",
        isoCode: "GG",
        flag: "https://flagcdn.com/w40/gg.png",
        example: "07781 123456"
    },
    {
        name: "Guinea",
        dialCode: "+224",
        isoCode: "GN",
        flag: "https://flagcdn.com/w40/gn.png",
        example: "620 12 34 56"
    },
    {
        name: "Guinea-Bisáu",
        dialCode: "+245",
        isoCode: "GW",
        flag: "https://flagcdn.com/w40/gw.png",
        example: "955 123 456"
    },
    {
        name: "Guyana",
        dialCode: "+592",
        isoCode: "GY",
        flag: "https://flagcdn.com/w40/gy.png",
        example: "609 1234"
    },
    {
        name: "Haití",
        dialCode: "+509",
        isoCode: "HT",
        flag: "https://flagcdn.com/w40/ht.png",
        example: "34 12 3456"
    },
    {
        name: "Santa Sede (Estado de la Ciudad del Vaticano)",
        dialCode: "+379",
        isoCode: "VA",
        flag: "https://flagcdn.com/w40/va.png",
        example: "06 6982"
    },
    {
        name: "Honduras",
        dialCode: "+504",
        isoCode: "HN",
        flag: "https://flagcdn.com/w40/hn.png",
        example: "9876 1234"
    },
    {
        name: "Hong Kong",
        dialCode: "+852",
        isoCode: "HK",
        flag: "https://flagcdn.com/w40/hk.png",
        example: "9123 4567"
    },
    {
        name: "Hungría",
        dialCode: "+36",
        isoCode: "HU",
        flag: "https://flagcdn.com/w40/hu.png",
        example: "20 123 4567"
    },
    {
        name: "Islandia",
        dialCode: "+354",
        isoCode: "IS",
        flag: "https://flagcdn.com/w40/is.png",
        example: "691 2345"
    },
    {
        name: "India",
        dialCode: "+91",
        isoCode: "IN",
        flag: "https://flagcdn.com/w40/in.png",
        example: "91234 56789"
    },
    {
        name: "Indonesia",
        dialCode: "+62",
        isoCode: "ID",
        flag: "https://flagcdn.com/w40/id.png",
        example: "0812 3456 7890"
    },
    {
        name: "Irán",
        dialCode: "+98",
        isoCode: "IR",
        flag: "https://flagcdn.com/w40/ir.png",
        example: "0912 345 6789"
    },
    {
        name: "Irak",
        dialCode: "+964",
        isoCode: "IQ",
        flag: "https://flagcdn.com/w40/iq.png",
        example: "0790 123 4567"
    },
    {
        name: "Irlanda",
        dialCode: "+353",
        isoCode: "IE",
        flag: "https://flagcdn.com/w40/ie.png",
        example: "085 123 4567"
    },
    {
        name: "Isla de Man",
        dialCode: "+44",
        isoCode: "IM",
        flag: "https://flagcdn.com/w40/im.png",
        example: "07624 123456"
    },
    {
        name: "Israel",
        dialCode: "+972",
        isoCode: "IL",
        flag: "https://flagcdn.com/w40/il.png",
        example: "050 123 4567"
    },
    {
        name: "Italia",
        dialCode: "+39",
        isoCode: "IT",
        flag: "https://flagcdn.com/w40/it.png",
        example: "347 123 4567"
    },
    {
        name: "Costa de Marfil",
        dialCode: "+225",
        isoCode: "CI",
        flag: "https://flagcdn.com/w40/ci.png",
        example: "01 23 45 67"
    },
    {
        name: "Jamaica",
        dialCode: "+1876",
        isoCode: "JM",
        flag: "https://flagcdn.com/w40/jm.png",
        example: "(876) 123-4567"
    },
    {
        name: "Japón",
        dialCode: "+81",
        isoCode: "JP",
        flag: "https://flagcdn.com/w40/jp.png",
        example: "090 1234 5678"
    },
    {
        name: "Jersey",
        dialCode: "+44",
        isoCode: "JE",
        flag: "https://flagcdn.com/w40/je.png",
        example: "07797 123456"
    },
    {
        name: "Jordania",
        dialCode: "+962",
        isoCode: "JO",
        flag: "https://flagcdn.com/w40/jo.png",
        example: "079 123 4567"
    },
    {
        name: "Kazajistán",
        dialCode: "+7",
        isoCode: "KZ",
        flag: "https://flagcdn.com/w40/kz.png",
        example: "701 123 4567"
    },
    {
        name: "Kenia",
        dialCode: "+254",
        isoCode: "KE",
        flag: "https://flagcdn.com/w40/ke.png",
        example: "0712 123456"
    },
    {
        name: "Kiribati",
        dialCode: "+686",
        isoCode: "KI",
        flag: "https://flagcdn.com/w40/ki.png",
        example: "72012345"
    },
    {
        name: "Corea del Norte",
        dialCode: "+850",
        isoCode: "KP",
        flag: "https://flagcdn.com/w40/kp.png",
        example: "191 234 5678"
    },
    {
        name: "Corea del Sur",
        dialCode: "+82",
        isoCode: "KR",
        flag: "https://flagcdn.com/w40/kr.png",
        example: "010 1234 5678"
    },
    {
        name: "Kosovo",
        dialCode: "+383",
        isoCode: "XK",
        flag: "https://flagcdn.com/w40/xk.png",
        example: "043 123 456"
    },
    {
        name: "Kuwait",
        dialCode: "+965",
        isoCode: "KW",
        flag: "https://flagcdn.com/w40/kw.png",
        example: "6501 2345"
    },
    {
        name: "Kirguistán",
        dialCode: "+996",
        isoCode: "KG",
        flag: "https://flagcdn.com/w40/kg.png",
        example: "0771 123 456"
    },
    {
        name: "Laos",
        dialCode: "+856",
        isoCode: "LA",
        flag: "https://flagcdn.com/w40/la.png",
        example: "020 56 789 123"
    },
    {
        name: "Letonia",
        dialCode: "+371",
        isoCode: "LV",
        flag: "https://flagcdn.com/w40/lv.png",
        example: "291 23456"
    },
    {
        name: "Líbano",
        dialCode: "+961",
        isoCode: "LB",
        flag: "https://flagcdn.com/w40/lb.png",
        example: "03 123 456"
    },
    {
        name: "Lesoto",
        dialCode: "+266",
        isoCode: "LS",
        flag: "https://flagcdn.com/w40/ls.png",
        example: "5812 3456"
    },
    {
        name: "Liberia",
        dialCode: "+231",
        isoCode: "LR",
        flag: "https://flagcdn.com/w40/lr.png",
        example: "077 012 345"
    },
    {
        name: "Libia",
        dialCode: "+218",
        isoCode: "LY",
        flag: "https://flagcdn.com/w40/ly.png",
        example: "091 234 5678"
    },
    {
        name: "Liechtenstein",
        dialCode: "+423",
        isoCode: "LI",
        flag: "https://flagcdn.com/w40/li.png",
        example: "660 123 456"
    },
    {
        name: "Lituania",
        dialCode: "+370",
        isoCode: "LT",
        flag: "https://flagcdn.com/w40/lt.png",
        example: "612 34567"
    },
    {
        name: "Luxemburgo",
        dialCode: "+352",
        isoCode: "LU",
        flag: "https://flagcdn.com/w40/lu.png",
        example: "621 123 456"
    },
    {
        name: "Macao",
        dialCode: "+853",
        isoCode: "MO",
        flag: "https://flagcdn.com/w40/mo.png",
        example: "6612 3456"
    },
    {
        name: "Madagascar",
        dialCode: "+261",
        isoCode: "MG",
        flag: "https://flagcdn.com/w40/mg.png",
        example: "032 12 345 67"
    },
    {
        name: "Malawi",
        dialCode: "+265",
        isoCode: "MW",
        flag: "https://flagcdn.com/w40/mw.png",
        example: "0991 234 567"
    },
    {
        name: "Malasia",
        dialCode: "+60",
        isoCode: "MY",
        flag: "https://flagcdn.com/w40/my.png",
        example: "012 345 6789"
    },
    {
        name: "Maldivas",
        dialCode: "+960",
        isoCode: "MV",
        flag: "https://flagcdn.com/w40/mv.png",
        example: "771 2345"
    },
    {
        name: "Malí",
        dialCode: "+223",
        isoCode: "ML",
        flag: "https://flagcdn.com/w40/ml.png",
        example: "65 12 34 56"
    },
    {
        name: "Malta",
        dialCode: "+356",
        isoCode: "MT",
        flag: "https://flagcdn.com/w40/mt.png",
        example: "9923 4567"
    },
    {
        name: "Islas Marshall",
        dialCode: "+692",
        isoCode: "MH",
        flag: "https://flagcdn.com/w40/mh.png",
        example: "235 1234"
    },
    {
        name: "Martinica",
        dialCode: "+596",
        isoCode: "MQ",
        flag: "https://flagcdn.com/w40/mq.png",
        example: "0696 12 34 56"
    },
    {
        name: "Mauritania",
        dialCode: "+222",
        isoCode: "MR",
        flag: "https://flagcdn.com/w40/mr.png",
        example: "22 12 34 56"
    },
    {
        name: "Mauricio",
        dialCode: "+230",
        isoCode: "MU",
        flag: "https://flagcdn.com/w40/mu.png",
        example: "5761 2345"
    },
    {
        name: "Mayotte",
        dialCode: "+262",
        isoCode: "YT",
        flag: "https://flagcdn.com/w40/yt.png",
        example: "0639 12 34 56"
    },
    {
        name: "México",
        dialCode: "+52",
        isoCode: "MX",
        flag: "https://flagcdn.com/w40/mx.png",
        example: "55 1234 5678"
    },
    {
        name: "Micronesia",
        dialCode: "+691",
        isoCode: "FM",
        flag: "https://flagcdn.com/w40/fm.png",
        example: "350 1234"
    },
    {
        name: "Moldavia",
        dialCode: "+373",
        isoCode: "MD",
        flag: "https://flagcdn.com/w40/md.png",
        example: "0600 12345"
    },
    {
        name: "Mónaco",
        dialCode: "+377",
        isoCode: "MC",
        flag: "https://flagcdn.com/w40/mc.png",
        example: "06 12 34 56 78"
    },
    {
        name: "Mongolia",
        dialCode: "+976",
        isoCode: "MN",
        flag: "https://flagcdn.com/w40/mn.png",
        example: "8811 1234"
    },
    {
        name: "Montenegro",
        dialCode: "+382",
        isoCode: "ME",
        flag: "https://flagcdn.com/w40/me.png",
        example: "067 123 456"
    },
    {
        name: "Montserrat",
        dialCode: "+1664",
        isoCode: "MS",
        flag: "https://flagcdn.com/w40/ms.png",
        example: "(664) 492-1234"
    },
    {
        name: "Marruecos",
        dialCode: "+212",
        isoCode: "MA",
        flag: "https://flagcdn.com/w40/ma.png",
        example: "0612 34 56 78"
    },
    {
        name: "Mozambique",
        dialCode: "+258",
        isoCode: "MZ",
        flag: "https://flagcdn.com/w40/mz.png",
        example: "82 123 4567"
    },
    {
        name: "Myanmar",
        dialCode: "+95",
        isoCode: "MM",
        flag: "https://flagcdn.com/w40/mm.png",
        example: "09 123 4567"
    },
    {
        name: "Namibia",
        dialCode: "+264",
        isoCode: "NA",
        flag: "https://flagcdn.com/w40/na.png",
        example: "081 123 4567"
    },
    {
        name: "Nauru",
        dialCode: "+674",
        isoCode: "NR",
        flag: "https://flagcdn.com/w40/nr.png",
        example: "556 7890"
    },
    {
        name: "Nepal",
        dialCode: "+977",
        isoCode: "NP",
        flag: "https://flagcdn.com/w40/np.png",
        example: "980 123 4567"
    },
    {
        name: "Países Bajos",
        dialCode: "+31",
        isoCode: "NL",
        flag: "https://flagcdn.com/w40/nl.png",
        example: "06 12345678"
    },
    {
        name: "Nueva Caledonia",
        dialCode: "+687",
        isoCode: "NC",
        flag: "https://flagcdn.com/w40/nc.png",
        example: "75 12 34"
    },
    {
        name: "Nueva Zelanda",
        dialCode: "+64",
        isoCode: "NZ",
        flag: "https://flagcdn.com/w40/nz.png",
        example: "021 123 4567"
    },
    {
        name: "Nicaragua",
        dialCode: "+505",
        isoCode: "NI",
        flag: "https://flagcdn.com/w40/ni.png",
        example: "8123 4567"
    },
    {
        name: "Níger",
        dialCode: "+227",
        isoCode: "NE",
        flag: "https://flagcdn.com/w40/ne.png",
        example: "93 12 34 56"
    },
    {
        name: "Nigeria",
        dialCode: "+234",
        isoCode: "NG",
        flag: "https://flagcdn.com/w40/ng.png",
        example: "0801 234 5678"
    },
    {
        name: "Niue",
        dialCode: "+683",
        isoCode: "NU",
        flag: "https://flagcdn.com/w40/nu.png",
        example: "1234"
    },
    {
        name: "Isla Norfolk",
        dialCode: "+672",
        isoCode: "NF",
        flag: "https://flagcdn.com/w40/nf.png",
        example: "23 456"
    },
    {
        name: "Macedonia del Norte",
        dialCode: "+389",
        isoCode: "MK",
        flag: "https://flagcdn.com/w40/mk.png",
        example: "072 123 456"
    },
    {
        name: "Islas Marianas del Norte",
        dialCode: "+1670",
        isoCode: "MP",
        flag: "https://flagcdn.com/w40/mp.png",
        example: "(670) 234-5678"
    },
    {
        name: "Noruega",
        dialCode: "+47",
        isoCode: "NO",
        flag: "https://flagcdn.com/w40/no.png",
        example: "412 34 567"
    },
    {
        name: "Omán",
        dialCode: "+968",
        isoCode: "OM",
        flag: "https://flagcdn.com/w40/om.png",
        example: "9212 3456"
    },
    {
        name: "Pakistán",
        dialCode: "+92",
        isoCode: "PK",
        flag: "https://flagcdn.com/w40/pk.png",
        example: "0301 2345678"
    },
    {
        name: "Palaos",
        dialCode: "+680",
        isoCode: "PW",
        flag: "https://flagcdn.com/w40/pw.png",
        example: "488 1234"
    },
    {
        name: "Palestina",
        dialCode: "+970",
        isoCode: "PS",
        flag: "https://flagcdn.com/w40/ps.png",
        example: "0599 123 456"
    },
    {
        name: "Panamá",
        dialCode: "+507",
        isoCode: "PA",
        flag: "https://flagcdn.com/w40/pa.png",
        example: "6123 4567"
    },
    {
        name: "Papúa Nueva Guinea",
        dialCode: "+675",
        isoCode: "PG",
        flag: "https://flagcdn.com/w40/pg.png",
        example: "7012 3456"
    },
    {
        name: "Paraguay",
        dialCode: "+595",
        isoCode: "PY",
        flag: "https://flagcdn.com/w40/py.png",
        example: "0981 123 456"
    },
    {
        name: "Perú",
        dialCode: "+51",
        isoCode: "PE",
        flag: "https://flagcdn.com/w40/pe.png",
        example: "912 345 678"
    },
    {
        name: "Filipinas",
        dialCode: "+63",
        isoCode: "PH",
        flag: "https://flagcdn.com/w40/ph.png",
        example: "0917 123 4567"
    },
    {
        name: "Islas Pitcairn",
        dialCode: "+872",
        isoCode: "PN",
        flag: "https://flagcdn.com/w40/pn.png",
        example: "1234"
    },
    {
        name: "Polonia",
        dialCode: "+48",
        isoCode: "PL",
        flag: "https://flagcdn.com/w40/pl.png",
        example: "601 234 567"
    },
    {
        name: "Portugal",
        dialCode: "+351",
        isoCode: "PT",
        flag: "https://flagcdn.com/w40/pt.png",
        example: "912 345 678"
    },
    {
        name: "Puerto Rico",
        dialCode: "+1",
        isoCode: "PR",
        flag: "https://flagcdn.com/w40/pr.png",
        example: "(787) 123-4567"
    },
    {
        name: "Catar",
        dialCode: "+974",
        isoCode: "QA",
        flag: "https://flagcdn.com/w40/qa.png",
        example: "3312 3456"
    },
    {
        name: "Reunión",
        dialCode: "+262",
        isoCode: "RE",
        flag: "https://flagcdn.com/w40/re.png",
        example: "0692 12 34 56"
    },
    {
        name: "Rumania",
        dialCode: "+40",
        isoCode: "RO",
        flag: "https://flagcdn.com/w40/ro.png",
        example: "0721 234 567"
    },
    {
        name: "Rusia",
        dialCode: "+7",
        isoCode: "RU",
        flag: "https://flagcdn.com/w40/ru.png",
        example: "8 (912) 345-67-89"
    },
    {
        name: "Ruanda",
        dialCode: "+250",
        isoCode: "RW",
        flag: "https://flagcdn.com/w40/rw.png",
        example: "0788 123 456"
    },
    {
        name: "San Bartolomé",
        dialCode: "+590",
        isoCode: "BL",
        flag: "https://flagcdn.com/w40/bl.png",
        example: "0690 12 34 56"
    },
    {
        name: "Santa Elena",
        dialCode: "+290",
        isoCode: "SH",
        flag: "https://flagcdn.com/w40/sh.png",
        example: "21000"
    },
    {
        name: "San Cristóbal y Nieves",
        dialCode: "+1869",
        isoCode: "KN",
        flag: "https://flagcdn.com/w40/kn.png",
        example: "(869) 765-4321"
    },
    {
        name: "Santa Lucía",
        dialCode: "+1758",
        isoCode: "LC",
        flag: "https://flagcdn.com/w40/lc.png",
        example: "(758) 123-4567"
    },
    {
        name: "San Martín",
        dialCode: "+590",
        isoCode: "MF",
        flag: "https://flagcdn.com/w40/mf.png",
        example: "0690 12 34 56"
    },
    {
        name: "San Pedro y Miquelón",
        dialCode: "+508",
        isoCode: "PM",
        flag: "https://flagcdn.com/w40/pm.png",
        example: "55 12 34"
    },
    {
        name: "San Vicente y las Granadinas",
        dialCode: "+1784",
        isoCode: "VC",
        flag: "https://flagcdn.com/w40/vc.png",
        example: "(784) 123-4567"
    },
    {
        name: "Samoa",
        dialCode: "+685",
        isoCode: "WS",
        flag: "https://flagcdn.com/w40/ws.png",
        example: "72 12345"
    },
    {
        name: "San Marino",
        dialCode: "+378",
        isoCode: "SM",
        flag: "https://flagcdn.com/w40/sm.png",
        example: "333 123 456"
    },
    {
        name: "Santo Tomé y Príncipe",
        dialCode: "+239",
        isoCode: "ST",
        flag: "https://flagcdn.com/w40/st.png",
        example: "992 1234"
    },
    {
        name: "Arabia Saudita",
        dialCode: "+966",
        isoCode: "SA",
        flag: "https://flagcdn.com/w40/sa.png",
        example: "050 123 4567"
    },
    {
        name: "Senegal",
        dialCode: "+221",
        isoCode: "SN",
        flag: "https://flagcdn.com/w40/sn.png",
        example: "77 123 45 67"
    },
    {
        name: "Serbia",
        dialCode: "+381",
        isoCode: "RS",
        flag: "https://flagcdn.com/w40/rs.png",
        example: "060 123 4567"
    },
    {
        name: "Seychelles",
        dialCode: "+248",
        isoCode: "SC",
        flag: "https://flagcdn.com/w40/sc.png",
        example: "251 0123"
    },
    {
        name: "Sierra Leona",
        dialCode: "+232",
        isoCode: "SL",
        flag: "https://flagcdn.com/w40/sl.png",
        example: "076 123456"
    },
    {
        name: "Singapur",
        dialCode: "+65",
        isoCode: "SG",
        flag: "https://flagcdn.com/w40/sg.png",
        example: "8123 4567"
    },
    {
        name: "Sint Maarten",
        dialCode: "+1721",
        isoCode: "SX",
        flag: "https://flagcdn.com/w40/sx.png",
        example: "(721) 520-5678"
    },
    {
        name: "Eslovaquia",
        dialCode: "+421",
        isoCode: "SK",
        flag: "https://flagcdn.com/w40/sk.png",
        example: "0912 123 456"
    },
    {
        name: "Eslovenia",
        dialCode: "+386",
        isoCode: "SI",
        flag: "https://flagcdn.com/w40/si.png",
        example: "031 234 567"
    },
    {
        name: "Islas Salomón",
        dialCode: "+677",
        isoCode: "SB",
        flag: "https://flagcdn.com/w40/sb.png",
        example: "74234"
    },
    {
        name: "Somalia",
        dialCode: "+252",
        isoCode: "SO",
        flag: "https://flagcdn.com/w40/so.png",
        example: "0612 345678"
    },
    {
        name: "Sudáfrica",
        dialCode: "+27",
        isoCode: "ZA",
        flag: "https://flagcdn.com/w40/za.png",
        example: "082 123 4567"
    },
    {
        name: "Islas Georgias del Sur y Sandwich del Sur",
        dialCode: "+500",
        isoCode: "GS",
        flag: "https://flagcdn.com/w40/gs.png",
        example: "500 123"
    },
    {
        name: "Sudán del Sur",
        dialCode: "+211",
        isoCode: "SS",
        flag: "https://flagcdn.com/w40/ss.png",
        example: "0912 345 678"
    },
    {
        name: "España",
        dialCode: "+34",
        isoCode: "ES",
        flag: "https://flagcdn.com/w40/es.png",
        example: "612 34 56 78"
    },
    {
        name: "Sri Lanka",
        dialCode: "+94",
        isoCode: "LK",
        flag: "https://flagcdn.com/w40/lk.png",
        example: "071 234 5678"
    },
    {
        name: "Sudán",
        dialCode: "+249",
        isoCode: "SD",
        flag: "https://flagcdn.com/w40/sd.png",
        example: "091 234 5678"
    },
    {
        name: "Surinam",
        dialCode: "+597",
        isoCode: "SR",
        flag: "https://flagcdn.com/w40/sr.png",
        example: "881 1234"
    },
    {
        name: "Svalbard y Jan Mayen",
        dialCode: "+47",
        isoCode: "SJ",
        flag: "https://flagcdn.com/w40/sj.png",
        example: "412 34 567"
    },
    {
        name: "Suecia",
        dialCode: "+46",
        isoCode: "SE",
        flag: "https://flagcdn.com/w40/se.png",
        example: "070 123 45 67"
    },
    {
        name: "Suiza",
        dialCode: "+41",
        isoCode: "CH",
        flag: "https://flagcdn.com/w40/ch.png",
        example: "079 123 45 67"
    },
    {
        name: "Siria",
        dialCode: "+963",
        isoCode: "SY",
        flag: "https://flagcdn.com/w40/sy.png",
        example: "0932 123 456"
    },
    {
        name: "Taiwán",
        dialCode: "+886",
        isoCode: "TW",
        flag: "https://flagcdn.com/w40/tw.png",
        example: "0912 345 678"
    },
    {
        name: "Tayikistán",
        dialCode: "+992",
        isoCode: "TJ",
        flag: "https://flagcdn.com/w40/tj.png",
        example: "918 12 3456"
    },
    {
        name: "Tanzania",
        dialCode: "+255",
        isoCode: "TZ",
        flag: "https://flagcdn.com/w40/tz.png",
        example: "0658 123 456"
    },
    {
        name: "Tailandia",
        dialCode: "+66",
        isoCode: "TH",
        flag: "https://flagcdn.com/w40/th.png",
        example: "081 234 5678"
    },
    {
        name: "Timor Oriental",
        dialCode: "+670",
        isoCode: "TL",
        flag: "https://flagcdn.com/w40/tl.png",
        example: "7721 2345"
    },
    {
        name: "Togo",
        dialCode: "+228",
        isoCode: "TG",
        flag: "https://flagcdn.com/w40/tg.png",
        example: "90 12 34 56"
    },
    {
        name: "Tokelau",
        dialCode: "+690",
        isoCode: "TK",
        flag: "https://flagcdn.com/w40/tk.png",
        example: "4123"
    },
    {
        name: "Tonga",
        dialCode: "+676",
        isoCode: "TO",
        flag: "https://flagcdn.com/w40/to.png",
        example: "871 2345"
    },
    {
        name: "Trinidad y Tobago",
        dialCode: "+1868",
        isoCode: "TT",
        flag: "https://flagcdn.com/w40/tt.png",
        example: "(868) 620-1234"
    },
    {
        name: "Túnez",
        dialCode: "+216",
        isoCode: "TN",
        flag: "https://flagcdn.com/w40/tn.png",
        example: "20 123 456"
    },
    {
        name: "Turquía",
        dialCode: "+90",
        isoCode: "TR",
        flag: "https://flagcdn.com/w40/tr.png",
        example: "0531 234 5678"
    },
    {
        name: "Turkmenistán",
        dialCode: "+993",
        isoCode: "TM",
        flag: "https://flagcdn.com/w40/tm.png",
        example: "66 12 34 56"
    },
    {
        name: "Islas Turcas y Caicos",
        dialCode: "+1649",
        isoCode: "TC",
        flag: "https://flagcdn.com/w40/tc.png",
        example: "(649) 232-1234"
    },
    {
        name: "Tuvalu",
        dialCode: "+688",
        isoCode: "TV",
        flag: "https://flagcdn.com/w40/tv.png",
        example: "90123"
    },
    {
        name: "Uganda",
        dialCode: "+256",
        isoCode: "UG",
        flag: "https://flagcdn.com/w40/ug.png",
        example: "0781 234567"
    },
    {
        name: "Ucrania",
        dialCode: "+380",
        isoCode: "UA",
        flag: "https://flagcdn.com/w40/ua.png",
        example: "050 123 4567"
    },
    {
        name: "Emiratos Árabes Unidos",
        dialCode: "+971",
        isoCode: "AE",
        flag: "https://flagcdn.com/w40/ae.png",
        example: "050 123 4567"
    },
    {
        name: "Reino Unido",
        dialCode: "+44",
        isoCode: "GB",
        flag: "https://flagcdn.com/w40/gb.png",
        example: "07123 456789"
    },
    {
        name: "Estados Unidos",
        dialCode: "+1",
        isoCode: "US",
        flag: "https://flagcdn.com/w40/us.png",
        example: "(415) 555-2671"
    },
    {
        name: "Uruguay",
        dialCode: "+598",
        isoCode: "UY",
        flag: "https://flagcdn.com/w40/uy.png",
        example: "099 123 456"
    },
    {
        name: "Uzbekistán",
        dialCode: "+998",
        isoCode: "UZ",
        flag: "https://flagcdn.com/w40/uz.png",
        example: "90 123 45 67"
    },
    {
        name: "Vanuatu",
        dialCode: "+678",
        isoCode: "VU",
        flag: "https://flagcdn.com/w40/vu.png",
        example: "541234"
    },
    {
        name: "Venezuela",
        dialCode: "+58",
        isoCode: "VE",
        flag: "https://flagcdn.com/w40/ve.png",
        example: "0414 123 4567"
    },
    {
        name: "Vietnam",
        dialCode: "+84",
        isoCode: "VN",
        flag: "https://flagcdn.com/w40/vn.png",
        example: "091 234 5678"
    },
    {
        name: "Islas Vírgenes Británicas",
        dialCode: "+1284",
        isoCode: "VG",
        flag: "https://flagcdn.com/w40/vg.png",
        example: "(284) 345-6789"
    },
    {
        name: "Islas Vírgenes de EE. UU.",
        dialCode: "+1340",
        isoCode: "VI",
        flag: "https://flagcdn.com/w40/vi.png",
        example: "(340) 123-4567"
    },
    {
        name: "Wallis y Futuna",
        dialCode: "+681",
        isoCode: "WF",
        flag: "https://flagcdn.com/w40/wf.png",
        example: "50 1234"
    },
    {
        name: "Yemen",
        dialCode: "+967",
        isoCode: "YE",
        flag: "https://flagcdn.com/w40/ye.png",
        example: "0712 345 678"
    },
    {
        name: "Zambia",
        dialCode: "+260",
        isoCode: "ZM",
        flag: "https://flagcdn.com/w40/zm.png",
        example: "097 1234567"
    },
    {
        name: "Zimbabue",
        dialCode: "+263",
        isoCode: "ZW",
        flag: "https://flagcdn.com/w40/zw.png",
        example: "0712 345 678"
    }
];

export default countries;