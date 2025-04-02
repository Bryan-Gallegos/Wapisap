const countries = [
    {
        "name": "Afganistán",
        "dialCode": "+93",
        "isoCode": "AF",
        "flag": "https://www.countryflags.io/AF/flat/64.png",
        "example": "070 123 4567"
    },
    {
        "name": "Islas Åland",
        "dialCode": "+358",
        "isoCode": "AX",
        "flag": "https://www.countryflags.io/AX/flat/64.png",
        "example": "041 2345678"
    },
    {
        "name": "Albania",
        "dialCode": "+355",
        "isoCode": "AL",
        "flag": "https://www.countryflags.io/AL/flat/64.png",
        "example": "066 123 4567"
    },
    {
        "name": "Argelia",
        "dialCode": "+213",
        "isoCode": "DZ",
        "flag": "https://www.countryflags.io/DZ/flat/64.png",
        "example": "0551 23 45 67"
    },
    {
        "name": "Samoa Americana",
        "dialCode": "+1684",
        "isoCode": "AS",
        "flag": "https://www.countryflags.io/AS/flat/64.png",
        "example": "(684) 733-1234"
    },
    {
        "name": "Andorra",
        "dialCode": "+376",
        "isoCode": "AD",
        "flag": "https://www.countryflags.io/AD/flat/64.png",
        "example": "312 345"
    },
    {
        "name": "Angola",
        "dialCode": "+244",
        "isoCode": "AO",
        "flag": "https://www.countryflags.io/AO/flat/64.png",
        "example": "923 123 456"
    },
    {
        "name": "Anguila",
        "dialCode": "+1264",
        "isoCode": "AI",
        "flag": "https://www.countryflags.io/AI/flat/64.png",
        "example": "(264) 235-1234"
    },
    {
        "name": "Antártida",
        "dialCode": "+672",
        "isoCode": "AQ",
        "flag": "https://www.countryflags.io/AQ/flat/64.png",
        "example": "10 1234"
    },
    {
        "name": "Antigua y Barbuda",
        "dialCode": "+1268",
        "isoCode": "AG",
        "flag": "https://www.countryflags.io/AG/flat/64.png",
        "example": "(268) 464-1234"
    },
    {
        "name": "Argentina",
        "dialCode": "+54",
        "isoCode": "AR",
        "flag": "https://www.countryflags.io/AR/flat/64.png",
        "example": "11 2345-6789"
    },
    {
        "name": "Armenia",
        "dialCode": "+374",
        "isoCode": "AM",
        "flag": "https://www.countryflags.io/AM/flat/64.png",
        "example": "077 123456"
    },
    {
        "name": "Aruba",
        "dialCode": "+297",
        "isoCode": "AW",
        "flag": "https://www.countryflags.io/AW/flat/64.png",
        "example": "560 1234"
    },
    {
        "name": "Isla Ascensión",
        "dialCode": "+247",
        "isoCode": "AC",
        "flag": "https://www.countryflags.io/AC/flat/64.png",
        "example": "7000"
    },
    {
        "name": "Australia",
        "dialCode": "+61",
        "isoCode": "AU",
        "flag": "https://www.countryflags.io/AU/flat/64.png",
        "example": "0412 345 678"
    },
    {
        "name": "Austria",
        "dialCode": "+43",
        "isoCode": "AT",
        "flag": "https://www.countryflags.io/AT/flat/64.png",
        "example": "0664 123456"
    },
    {
        "name": "Azerbaiyán",
        "dialCode": "+994",
        "isoCode": "AZ",
        "flag": "https://www.countryflags.io/AZ/flat/64.png",
        "example": "040 123 45 67"
    },
    {
        "name": "Bahamas",
        "dialCode": "+1242",
        "isoCode": "BS",
        "flag": "https://www.countryflags.io/BS/flat/64.png",
        "example": "(242) 359-1234"
    },
    {
        "name": "Bahréin",
        "dialCode": "+973",
        "isoCode": "BH",
        "flag": "https://www.countryflags.io/BH/flat/64.png",
        "example": "3600 1234"
    },
    {
        "name": "Bangladés",
        "dialCode": "+880",
        "isoCode": "BD",
        "flag": "https://www.countryflags.io/BD/flat/64.png",
        "example": "01812-345678"
    },
    {
        name: "Barbados",
        dialCode: "+1246",
        isoCode: "BB",
        flag: "https://www.countryflags.io/BB/flat/64.png",
        example: "(246) 250-1234"
    },
    {
        name: "Bielorrusia",
        dialCode: "+375",
        isoCode: "BY",
        flag: "https://www.countryflags.io/BY/flat/64.png",
        example: "029 123-45-67"
    },
    {
        name: "Bélgica",
        dialCode: "+32",
        isoCode: "BE",
        flag: "https://www.countryflags.io/BE/flat/64.png",
        example: "0470 12 34 56"
    },
    {
        name: "Belice",
        dialCode: "+501",
        isoCode: "BZ",
        flag: "https://www.countryflags.io/BZ/flat/64.png",
        example: "622-1234"
    },
    {
        name: "Benín",
        dialCode: "+229",
        isoCode: "BJ",
        flag: "https://www.countryflags.io/BJ/flat/64.png",
        example: "90 01 23 45"
    },
    {
        name: "Bermudas",
        dialCode: "+1441",
        isoCode: "BM",
        flag: "https://www.countryflags.io/BM/flat/64.png",
        example: "(441) 370-1234"
    },
    {
        name: "Bután",
        dialCode: "+975",
        isoCode: "BT",
        flag: "https://www.countryflags.io/BT/flat/64.png",
        example: "17 12 3456"
    },
    {
        name: "Bolivia",
        dialCode: "+591",
        isoCode: "BO",
        flag: "https://www.countryflags.io/BO/flat/64.png",
        example: "71234567"
    },
    {
        name: "Bosnia y Herzegovina",
        dialCode: "+387",
        isoCode: "BA",
        flag: "https://www.countryflags.io/BA/flat/64.png",
        example: "061 123 456"
    },
    {
        name: "Botsuana",
        dialCode: "+267",
        isoCode: "BW",
        flag: "https://www.countryflags.io/BW/flat/64.png",
        example: "71 123 456"
    },
    {
        name: "Brasil",
        dialCode: "+55",
        isoCode: "BR",
        flag: "https://www.countryflags.io/BR/flat/64.png",
        example: "(11) 91234-5678"
    },
    {
        name: "Territorio Británico del Océano Índico",
        dialCode: "+246",
        isoCode: "IO",
        flag: "https://www.countryflags.io/IO/flat/64.png",
        example: "380 1234"
    },
    {
        name: "Brunéi Darussalam",
        dialCode: "+673",
        isoCode: "BN",
        flag: "https://www.countryflags.io/BN/flat/64.png",
        example: "712 3456"
    },
    {
        name: "Bulgaria",
        dialCode: "+359",
        isoCode: "BG",
        flag: "https://www.countryflags.io/BG/flat/64.png",
        example: "088 123 4567"
    },
    {
        name: "Burkina Faso",
        dialCode: "+226",
        isoCode: "BF",
        flag: "https://www.countryflags.io/BF/flat/64.png",
        example: "70 12 34 56"
    },
    {
        name: "Burundi",
        dialCode: "+257",
        isoCode: "BI",
        flag: "https://www.countryflags.io/BI/flat/64.png",
        example: "79 123 456"
    },
    {
        name: "Camboya",
        dialCode: "+855",
        isoCode: "KH",
        flag: "https://www.countryflags.io/KH/flat/64.png",
        example: "092 123 456"
    },
    {
        name: "Camerún",
        dialCode: "+237",
        isoCode: "CM",
        flag: "https://www.countryflags.io/CM/flat/64.png",
        example: "6 71 23 45 67"
    },
    {
        name: "Canadá",
        dialCode: "+1",
        isoCode: "CA",
        flag: "https://www.countryflags.io/CA/flat/64.png",
        example: "(416) 123-4567"
    },
    {
        name: "Cabo Verde",
        dialCode: "+238",
        isoCode: "CV",
        flag: "https://www.countryflags.io/CV/flat/64.png",
        example: "991 12 34"
    },
    {
        name: "Islas Caimán",
        dialCode: "+1345",
        isoCode: "KY",
        flag: "https://www.countryflags.io/KY/flat/64.png",
        example: "(345) 926-1234"
    },
    {
        name: "República Centroafricana",
        dialCode: "+236",
        isoCode: "CF",
        flag: "https://www.countryflags.io/CF/flat/64.png",
        example: "70 12 34 56"
    },
    {
        name: "Chad",
        dialCode: "+235",
        isoCode: "TD",
        flag: "https://www.countryflags.io/TD/flat/64.png",
        example: "63 12 34 56"
    },
    {
        name: "Chile",
        dialCode: "+56",
        isoCode: "CL",
        flag: "https://www.countryflags.io/CL/flat/64.png",
        example: "9 9123 4567"
    },
    {
        name: "China",
        dialCode: "+86",
        isoCode: "CN",
        flag: "https://www.countryflags.io/CN/flat/64.png",
        example: "138 1234 5678"
    },
    {
        name: "Isla de Navidad",
        dialCode: "+61",
        isoCode: "CX",
        flag: "https://www.countryflags.io/CX/flat/64.png",
        example: "0412 345 678"
    },
    {
        name: "Islas Cocos (Keeling)",
        dialCode: "+61",
        isoCode: "CC",
        flag: "https://www.countryflags.io/CC/flat/64.png",
        example: "0412 345 678"
    },
    {
        name: "Colombia",
        dialCode: "+57",
        isoCode: "CO",
        flag: "https://www.countryflags.io/CO/flat/64.png",
        example: "301 1234567"
    },
    {
        name: "Comoras",
        dialCode: "+269",
        isoCode: "KM",
        flag: "https://www.countryflags.io/KM/flat/64.png",
        example: "321 23 45"
    },
    {
        name: "Congo",
        dialCode: "+242",
        isoCode: "CG",
        flag: "https://www.countryflags.io/CG/flat/64.png",
        example: "06 123 4567"
    },
    {
        name: "Islas Cook",
        dialCode: "+682",
        isoCode: "CK",
        flag: "https://www.countryflags.io/CK/flat/64.png",
        example: "21 234"
    },
    {
        name: "Costa Rica",
        dialCode: "+506",
        isoCode: "CR",
        flag: "https://www.countryflags.io/CR/flat/64.png",
        example: "8312 3456"
    },
    {
        name: "Croacia",
        dialCode: "+385",
        isoCode: "HR",
        flag: "https://www.countryflags.io/HR/flat/64.png",
        example: "091 123 4567"
    },
    {
        name: "Cuba",
        dialCode: "+53",
        isoCode: "CU",
        flag: "https://www.countryflags.io/CU/flat/64.png",
        example: "05 123 4567"
    },
    {
        name: "Chipre",
        dialCode: "+357",
        isoCode: "CY",
        flag: "https://www.countryflags.io/CY/flat/64.png",
        example: "96 123456"
    },
    {
        name: "República Checa",
        dialCode: "+420",
        isoCode: "CZ",
        flag: "https://www.countryflags.io/CZ/flat/64.png",
        example: "601 123 456"
    },
    {
        name: "República Democrática del Congo",
        dialCode: "+243",
        isoCode: "CD",
        flag: "https://www.countryflags.io/CD/flat/64.png",
        example: "099 123 4567"
    },
    {
        name: "Dinamarca",
        dialCode: "+45",
        isoCode: "DK",
        flag: "https://www.countryflags.io/DK/flat/64.png",
        example: "21 23 45 67"
    },
    {
        name: "Yibuti",
        dialCode: "+253",
        isoCode: "DJ",
        flag: "https://www.countryflags.io/DJ/flat/64.png",
        example: "77 12 34 56"
    },
    {
        name: "Dominica",
        dialCode: "+1767",
        isoCode: "DM",
        flag: "https://www.countryflags.io/DM/flat/64.png",
        example: "(767) 225-1234"
    },
    {
        name: "República Dominicana",
        dialCode: "+1849",
        isoCode: "DO",
        flag: "https://www.countryflags.io/DO/flat/64.png",
        example: "(849) 555-1234"
    },
    {
        name: "Ecuador",
        dialCode: "+593",
        isoCode: "EC",
        flag: "https://www.countryflags.io/EC/flat/64.png",
        example: "099 123 4567"
    },
    {
        name: "Egipto",
        dialCode: "+20",
        isoCode: "EG",
        flag: "https://www.countryflags.io/EG/flat/64.png",
        example: "0100 123 4567"
    },
    {
        name: "El Salvador",
        dialCode: "+503",
        isoCode: "SV",
        flag: "https://www.countryflags.io/SV/flat/64.png",
        example: "7012 3456"
    },
    {
        name: "Guinea Ecuatorial",
        dialCode: "+240",
        isoCode: "GQ",
        flag: "https://www.countryflags.io/GQ/flat/64.png",
        example: "222 123 456"
    },
    {
        name: "Eritrea",
        dialCode: "+291",
        isoCode: "ER",
        flag: "https://www.countryflags.io/ER/flat/64.png",
        example: "07 123 456"
    },
    {
        name: "Estonia",
        dialCode: "+372",
        isoCode: "EE",
        flag: "https://www.countryflags.io/EE/flat/64.png",
        example: "5123 4567"
    },
    {
        name: "Esuatini",
        dialCode: "+268",
        isoCode: "SZ",
        flag: "https://www.countryflags.io/SZ/flat/64.png",
        example: "7612 3456"
    },
    {
        name: "Etiopía",
        dialCode: "+251",
        isoCode: "ET",
        flag: "https://www.countryflags.io/ET/flat/64.png",
        example: "091 123 4567"
    },
    {
        name: "Islas Malvinas (Falkland)",
        dialCode: "+500",
        isoCode: "FK",
        flag: "https://www.countryflags.io/FK/flat/64.png",
        example: "51234"
    },
    {
        name: "Islas Feroe",
        dialCode: "+298",
        isoCode: "FO",
        flag: "https://www.countryflags.io/FO/flat/64.png",
        example: "211234"
    },
    {
        name: "Fiyi",
        dialCode: "+679",
        isoCode: "FJ",
        flag: "https://www.countryflags.io/FJ/flat/64.png",
        example: "701 2345"
    },
    {
        name: "Finlandia",
        dialCode: "+358",
        isoCode: "FI",
        flag: "https://www.countryflags.io/FI/flat/64.png",
        example: "041 2345678"
    },
    {
        name: "Francia",
        dialCode: "+33",
        isoCode: "FR",
        flag: "https://www.countryflags.io/FR/flat/64.png",
        example: "06 12 34 56 78"
    },
    {
        name: "Guayana Francesa",
        dialCode: "+594",
        isoCode: "GF",
        flag: "https://www.countryflags.io/GF/flat/64.png",
        example: "0694 12 34 56"
    },
    {
        name: "Polinesia Francesa",
        dialCode: "+689",
        isoCode: "PF",
        flag: "https://www.countryflags.io/PF/flat/64.png",
        example: "87 12 34 56"
    },
    {
        name: "Gabón",
        dialCode: "+241",
        isoCode: "GA",
        flag: "https://www.countryflags.io/GA/flat/64.png",
        example: "06 03 12 34"
    },
    {
        name: "Gambia",
        dialCode: "+220",
        isoCode: "GM",
        flag: "https://www.countryflags.io/GM/flat/64.png",
        example: "7012345"
    },
    {
        name: "Georgia",
        dialCode: "+995",
        isoCode: "GE",
        flag: "https://www.countryflags.io/GE/flat/64.png",
        example: "595 12 34 56"
    },
    {
        name: "Alemania",
        dialCode: "+49",
        isoCode: "DE",
        flag: "https://www.countryflags.io/DE/flat/64.png",
        example: "0151 23456789"
    },
    {
        name: "Ghana",
        dialCode: "+233",
        isoCode: "GH",
        flag: "https://www.countryflags.io/GH/flat/64.png",
        example: "024 123 4567"
    },
    {
        name: "Gibraltar",
        dialCode: "+350",
        isoCode: "GI",
        flag: "https://www.countryflags.io/GI/flat/64.png",
        example: "54001234"
    },
    {
        name: "Grecia",
        dialCode: "+30",
        isoCode: "GR",
        flag: "https://www.countryflags.io/GR/flat/64.png",
        example: "691 234 5678"
    },
    {
        name: "Groenlandia",
        dialCode: "+299",
        isoCode: "GL",
        flag: "https://www.countryflags.io/GL/flat/64.png",
        example: "22 12 34"
    },
    {
        name: "Granada",
        dialCode: "+1473",
        isoCode: "GD",
        flag: "https://www.countryflags.io/GD/flat/64.png",
        example: "(473) 403-1234"
    },
    {
        name: "Guadalupe",
        dialCode: "+590",
        isoCode: "GP",
        flag: "https://www.countryflags.io/GP/flat/64.png",
        example: "0690 12 34 56"
    },
    {
        name: "Guam",
        dialCode: "+1671",
        isoCode: "GU",
        flag: "https://www.countryflags.io/GU/flat/64.png",
        example: "(671) 788-1234"
    },
    {
        name: "Guatemala",
        dialCode: "+502",
        isoCode: "GT",
        flag: "https://www.countryflags.io/GT/flat/64.png",
        example: "5123 4567"
    },
    {
        name: "Guernsey",
        dialCode: "+44",
        isoCode: "GG",
        flag: "https://www.countryflags.io/GG/flat/64.png",
        example: "07781 123456"
    },
    {
        name: "Guinea",
        dialCode: "+224",
        isoCode: "GN",
        flag: "https://www.countryflags.io/GN/flat/64.png",
        example: "620 12 34 56"
    },
    {
        name: "Guinea-Bisáu",
        dialCode: "+245",
        isoCode: "GW",
        flag: "https://www.countryflags.io/GW/flat/64.png",
        example: "955 123 456"
    },
    {
        name: "Guyana",
        dialCode: "+592",
        isoCode: "GY",
        flag: "https://www.countryflags.io/GY/flat/64.png",
        example: "609 1234"
    },
    {
        name: "Haití",
        dialCode: "+509",
        isoCode: "HT",
        flag: "https://www.countryflags.io/HT/flat/64.png",
        example: "34 12 3456"
    },
    {
        name: "Santa Sede (Estado de la Ciudad del Vaticano)",
        dialCode: "+379",
        isoCode: "VA",
        flag: "https://www.countryflags.io/VA/flat/64.png",
        example: "06 6982"
    },
    {
        name: "Honduras",
        dialCode: "+504",
        isoCode: "HN",
        flag: "https://www.countryflags.io/HN/flat/64.png",
        example: "9876 1234"
    },
    {
        name: "Hong Kong",
        dialCode: "+852",
        isoCode: "HK",
        flag: "https://www.countryflags.io/HK/flat/64.png",
        example: "9123 4567"
    },
    {
        name: "Hungría",
        dialCode: "+36",
        isoCode: "HU",
        flag: "https://www.countryflags.io/HU/flat/64.png",
        example: "20 123 4567"
    },
    {
        name: "Islandia",
        dialCode: "+354",
        isoCode: "IS",
        flag: "https://www.countryflags.io/IS/flat/64.png",
        example: "691 2345"
    },
    {
        name: "India",
        dialCode: "+91",
        isoCode: "IN",
        flag: "https://www.countryflags.io/IN/flat/64.png",
        example: "91234 56789"
    },
    {
        name: "Indonesia",
        dialCode: "+62",
        isoCode: "ID",
        flag: "https://www.countryflags.io/ID/flat/64.png",
        example: "0812 3456 7890"
    },
    {
        name: "Irán",
        dialCode: "+98",
        isoCode: "IR",
        flag: "https://www.countryflags.io/IR/flat/64.png",
        example: "0912 345 6789"
    },
    {
        name: "Irak",
        dialCode: "+964",
        isoCode: "IQ",
        flag: "https://www.countryflags.io/IQ/flat/64.png",
        example: "0790 123 4567"
    },
    {
        name: "Irlanda",
        dialCode: "+353",
        isoCode: "IE",
        flag: "https://www.countryflags.io/IE/flat/64.png",
        example: "085 123 4567"
    },
    {
        name: "Isla de Man",
        dialCode: "+44",
        isoCode: "IM",
        flag: "https://www.countryflags.io/IM/flat/64.png",
        example: "07624 123456"
    },
    {
        name: "Israel",
        dialCode: "+972",
        isoCode: "IL",
        flag: "https://www.countryflags.io/IL/flat/64.png",
        example: "050 123 4567"
    },
    {
        name: "Italia",
        dialCode: "+39",
        isoCode: "IT",
        flag: "https://www.countryflags.io/IT/flat/64.png",
        example: "347 123 4567"
    },
    {
        name: "Costa de Marfil",
        dialCode: "+225",
        isoCode: "CI",
        flag: "https://www.countryflags.io/CI/flat/64.png",
        example: "01 23 45 67"
    },
    {
        name: "Jamaica",
        dialCode: "+1876",
        isoCode: "JM",
        flag: "https://www.countryflags.io/JM/flat/64.png",
        example: "(876) 123-4567"
    },
    {
        name: "Japón",
        dialCode: "+81",
        isoCode: "JP",
        flag: "https://www.countryflags.io/JP/flat/64.png",
        example: "090 1234 5678"
    },
    {
        name: "Jersey",
        dialCode: "+44",
        isoCode: "JE",
        flag: "https://www.countryflags.io/JE/flat/64.png",
        example: "07797 123456"
    },
    {
        name: "Jordania",
        dialCode: "+962",
        isoCode: "JO",
        flag: "https://www.countryflags.io/JO/flat/64.png",
        example: "079 123 4567"
    },
    {
        name: "Kazajistán",
        dialCode: "+7",
        isoCode: "KZ",
        flag: "https://www.countryflags.io/KZ/flat/64.png",
        example: "701 123 4567"
    },
    {
        name: "Kenia",
        dialCode: "+254",
        isoCode: "KE",
        flag: "https://www.countryflags.io/KE/flat/64.png",
        example: "0712 123456"
    },
    {
        name: "Kiribati",
        dialCode: "+686",
        isoCode: "KI",
        flag: "https://www.countryflags.io/KI/flat/64.png",
        example: "72012345"
    },
    {
        name: "Corea del Norte",
        dialCode: "+850",
        isoCode: "KP",
        flag: "https://www.countryflags.io/KP/flat/64.png",
        example: "191 234 5678"
    },
    {
        name: "Corea del Sur",
        dialCode: "+82",
        isoCode: "KR",
        flag: "https://www.countryflags.io/KR/flat/64.png",
        example: "010 1234 5678"
    },
    {
        name: "Kosovo",
        dialCode: "+383",
        isoCode: "XK",
        flag: "https://www.countryflags.io/XK/flat/64.png",
        example: "043 123 456"
    },
    {
        name: "Kuwait",
        dialCode: "+965",
        isoCode: "KW",
        flag: "https://www.countryflags.io/KW/flat/64.png",
        example: "6501 2345"
    },
    {
        name: "Kirguistán",
        dialCode: "+996",
        isoCode: "KG",
        flag: "https://www.countryflags.io/KG/flat/64.png",
        example: "0771 123 456"
    },
    {
        name: "Laos",
        dialCode: "+856",
        isoCode: "LA",
        flag: "https://www.countryflags.io/LA/flat/64.png",
        example: "020 56 789 123"
    },
    {
        name: "Letonia",
        dialCode: "+371",
        isoCode: "LV",
        flag: "https://www.countryflags.io/LV/flat/64.png",
        example: "291 23456"
    },
    {
        name: "Líbano",
        dialCode: "+961",
        isoCode: "LB",
        flag: "https://www.countryflags.io/LB/flat/64.png",
        example: "03 123 456"
    },
    {
        name: "Lesoto",
        dialCode: "+266",
        isoCode: "LS",
        flag: "https://www.countryflags.io/LS/flat/64.png",
        example: "5812 3456"
    },
    {
        name: "Liberia",
        dialCode: "+231",
        isoCode: "LR",
        flag: "https://www.countryflags.io/LR/flat/64.png",
        example: "077 012 345"
    },
    {
        name: "Libia",
        dialCode: "+218",
        isoCode: "LY",
        flag: "https://www.countryflags.io/LY/flat/64.png",
        example: "091 234 5678"
    },
    {
        name: "Liechtenstein",
        dialCode: "+423",
        isoCode: "LI",
        flag: "https://www.countryflags.io/LI/flat/64.png",
        example: "660 123 456"
    },
    {
        name: "Lituania",
        dialCode: "+370",
        isoCode: "LT",
        flag: "https://www.countryflags.io/LT/flat/64.png",
        example: "612 34567"
    },
    {
        name: "Luxemburgo",
        dialCode: "+352",
        isoCode: "LU",
        flag: "https://www.countryflags.io/LU/flat/64.png",
        example: "621 123 456"
    },
    {
        name: "Macao",
        dialCode: "+853",
        isoCode: "MO",
        flag: "https://www.countryflags.io/MO/flat/64.png",
        example: "6612 3456"
    },
    {
        name: "Madagascar",
        dialCode: "+261",
        isoCode: "MG",
        flag: "https://www.countryflags.io/MG/flat/64.png",
        example: "032 12 345 67"
    },
    {
        name: "Malawi",
        dialCode: "+265",
        isoCode: "MW",
        flag: "https://www.countryflags.io/MW/flat/64.png",
        example: "0991 234 567"
    },
    {
        name: "Malasia",
        dialCode: "+60",
        isoCode: "MY",
        flag: "https://www.countryflags.io/MY/flat/64.png",
        example: "012 345 6789"
    },
    {
        name: "Maldivas",
        dialCode: "+960",
        isoCode: "MV",
        flag: "https://www.countryflags.io/MV/flat/64.png",
        example: "771 2345"
    },
    {
        name: "Malí",
        dialCode: "+223",
        isoCode: "ML",
        flag: "https://www.countryflags.io/ML/flat/64.png",
        example: "65 12 34 56"
    },
    {
        name: "Malta",
        dialCode: "+356",
        isoCode: "MT",
        flag: "https://www.countryflags.io/MT/flat/64.png",
        example: "9923 4567"
    },
    {
        name: "Islas Marshall",
        dialCode: "+692",
        isoCode: "MH",
        flag: "https://www.countryflags.io/MH/flat/64.png",
        example: "235 1234"
    },
    {
        name: "Martinica",
        dialCode: "+596",
        isoCode: "MQ",
        flag: "https://www.countryflags.io/MQ/flat/64.png",
        example: "0696 12 34 56"
    },
    {
        name: "Mauritania",
        dialCode: "+222",
        isoCode: "MR",
        flag: "https://www.countryflags.io/MR/flat/64.png",
        example: "22 12 34 56"
    },
    {
        name: "Mauricio",
        dialCode: "+230",
        isoCode: "MU",
        flag: "https://www.countryflags.io/MU/flat/64.png",
        example: "5761 2345"
    },
    {
        name: "Mayotte",
        dialCode: "+262",
        isoCode: "YT",
        flag: "https://www.countryflags.io/YT/flat/64.png",
        example: "0639 12 34 56"
    },
    {
        name: "México",
        dialCode: "+52",
        isoCode: "MX",
        flag: "https://www.countryflags.io/MX/flat/64.png",
        example: "55 1234 5678"
    },
    {
        name: "Micronesia",
        dialCode: "+691",
        isoCode: "FM",
        flag: "https://www.countryflags.io/FM/flat/64.png",
        example: "350 1234"
    },
    {
        name: "Moldavia",
        dialCode: "+373",
        isoCode: "MD",
        flag: "https://www.countryflags.io/MD/flat/64.png",
        example: "0600 12345"
    },
    {
        name: "Mónaco",
        dialCode: "+377",
        isoCode: "MC",
        flag: "https://www.countryflags.io/MC/flat/64.png",
        example: "06 12 34 56 78"
    },
    {
        name: "Mongolia",
        dialCode: "+976",
        isoCode: "MN",
        flag: "https://www.countryflags.io/MN/flat/64.png",
        example: "8811 1234"
    },
    {
        name: "Montenegro",
        dialCode: "+382",
        isoCode: "ME",
        flag: "https://www.countryflags.io/ME/flat/64.png",
        example: "067 123 456"
    },
    {
        name: "Montserrat",
        dialCode: "+1664",
        isoCode: "MS",
        flag: "https://www.countryflags.io/MS/flat/64.png",
        example: "(664) 492-1234"
    },
    {
        name: "Marruecos",
        dialCode: "+212",
        isoCode: "MA",
        flag: "https://www.countryflags.io/MA/flat/64.png",
        example: "0612 34 56 78"
    },
    {
        name: "Mozambique",
        dialCode: "+258",
        isoCode: "MZ",
        flag: "https://www.countryflags.io/MZ/flat/64.png",
        example: "82 123 4567"
    },
    {
        name: "Myanmar",
        dialCode: "+95",
        isoCode: "MM",
        flag: "https://www.countryflags.io/MM/flat/64.png",
        example: "09 123 4567"
    },
    

];

export default countries;