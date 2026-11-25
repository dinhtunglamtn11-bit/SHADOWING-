// Mã quốc gia 3 chữ cái (ISO 3166-1 alpha-3) cho các nước trên bản đồ, khóa theo tên trong dữ liệu world-110m.json (Natural Earth, phạm vi công cộng).
// Nước chưa có mã chính thức (Bắc Síp, Somaliland) để trống; Kosovo dùng mã tạm thông dụng XKX.
export const ISO3 = {
  'Afghanistan': 'AFG', 'Albania': 'ALB', 'Antarctica': 'ATA', 'Algeria': 'DZA', 'Angola': 'AGO', 'Azerbaijan': 'AZE', 'Argentina': 'ARG', 'Australia': 'AUS', 'Austria': 'AUT', 'Bahamas': 'BHS', 'Bangladesh': 'BGD', 'Armenia': 'ARM',
  'Belgium': 'BEL', 'Bhutan': 'BTN', 'Bolivia': 'BOL', 'Bosnia and Herz.': 'BIH', 'Botswana': 'BWA', 'Brazil': 'BRA', 'Belize': 'BLZ', 'Solomon Is.': 'SLB', 'Brunei': 'BRN', 'Bulgaria': 'BGR', 'Myanmar': 'MMR', 'Burundi': 'BDI',
  'Belarus': 'BLR', 'Cambodia': 'KHM', 'Cameroon': 'CMR', 'Canada': 'CAN', 'Central African Rep.': 'CAF', 'Sri Lanka': 'LKA', 'Chad': 'TCD', 'Chile': 'CHL', 'China': 'CHN', 'Taiwan': 'TWN', 'Colombia': 'COL', 'Congo': 'COG',
  'Dem. Rep. Congo': 'COD', 'Costa Rica': 'CRI', 'Croatia': 'HRV', 'Cuba': 'CUB', 'Cyprus': 'CYP', 'Czechia': 'CZE', 'Benin': 'BEN', 'Denmark': 'DNK', 'Dominican Rep.': 'DOM', 'Ecuador': 'ECU', 'El Salvador': 'SLV', 'Eq. Guinea': 'GNQ',
  'Ethiopia': 'ETH', 'Eritrea': 'ERI', 'Estonia': 'EST', 'Falkland Is.': 'FLK', 'Fiji': 'FJI', 'Finland': 'FIN', 'France': 'FRA', 'Fr. S. Antarctic Lands': 'ATF', 'Djibouti': 'DJI', 'Gabon': 'GAB', 'Georgia': 'GEO', 'Gambia': 'GMB',
  'Palestine': 'PSE', 'Germany': 'DEU', 'Ghana': 'GHA', 'Greece': 'GRC', 'Greenland': 'GRL', 'Guatemala': 'GTM', 'Guinea': 'GIN', 'Guyana': 'GUY', 'Haiti': 'HTI', 'Honduras': 'HND', 'Hungary': 'HUN', 'Iceland': 'ISL',
  'India': 'IND', 'Indonesia': 'IDN', 'Iran': 'IRN', 'Iraq': 'IRQ', 'Ireland': 'IRL', 'Israel': 'ISR', 'Italy': 'ITA', 'Côte d\'Ivoire': 'CIV', 'Jamaica': 'JAM', 'Japan': 'JPN', 'Kazakhstan': 'KAZ', 'Jordan': 'JOR',
  'Kenya': 'KEN', 'North Korea': 'PRK', 'South Korea': 'KOR', 'Kuwait': 'KWT', 'Kyrgyzstan': 'KGZ', 'Laos': 'LAO', 'Lebanon': 'LBN', 'Lesotho': 'LSO', 'Latvia': 'LVA', 'Liberia': 'LBR', 'Libya': 'LBY', 'Lithuania': 'LTU',
  'Luxembourg': 'LUX', 'Madagascar': 'MDG', 'Malawi': 'MWI', 'Malaysia': 'MYS', 'Mali': 'MLI', 'Mauritania': 'MRT', 'Mexico': 'MEX', 'Mongolia': 'MNG', 'Moldova': 'MDA', 'Montenegro': 'MNE', 'Morocco': 'MAR', 'Mozambique': 'MOZ',
  'Oman': 'OMN', 'Namibia': 'NAM', 'Nepal': 'NPL', 'Netherlands': 'NLD', 'New Caledonia': 'NCL', 'Vanuatu': 'VUT', 'New Zealand': 'NZL', 'Nicaragua': 'NIC', 'Niger': 'NER', 'Nigeria': 'NGA', 'Norway': 'NOR', 'Pakistan': 'PAK',
  'Panama': 'PAN', 'Papua New Guinea': 'PNG', 'Paraguay': 'PRY', 'Peru': 'PER', 'Philippines': 'PHL', 'Poland': 'POL', 'Portugal': 'PRT', 'Guinea-Bissau': 'GNB', 'Timor-Leste': 'TLS', 'Puerto Rico': 'PRI', 'Qatar': 'QAT', 'Romania': 'ROU',
  'Russia': 'RUS', 'Rwanda': 'RWA', 'Saudi Arabia': 'SAU', 'Senegal': 'SEN', 'Serbia': 'SRB', 'Sierra Leone': 'SLE', 'Slovakia': 'SVK', 'Vietnam': 'VNM', 'Slovenia': 'SVN', 'Somalia': 'SOM', 'South Africa': 'ZAF', 'Zimbabwe': 'ZWE',
  'Spain': 'ESP', 'S. Sudan': 'SSD', 'Sudan': 'SDN', 'W. Sahara': 'ESH', 'Suriname': 'SUR', 'eSwatini': 'SWZ', 'Sweden': 'SWE', 'Switzerland': 'CHE', 'Syria': 'SYR', 'Tajikistan': 'TJK', 'Thailand': 'THA', 'Togo': 'TGO',
  'Trinidad and Tobago': 'TTO', 'United Arab Emirates': 'ARE', 'Tunisia': 'TUN', 'Turkey': 'TUR', 'Turkmenistan': 'TKM', 'Uganda': 'UGA', 'Ukraine': 'UKR', 'Macedonia': 'MKD', 'Egypt': 'EGY', 'United Kingdom': 'GBR', 'Tanzania': 'TZA',
  'United States of America': 'USA', 'Burkina Faso': 'BFA', 'Uruguay': 'URY', 'Uzbekistan': 'UZB', 'Venezuela': 'VEN', 'Yemen': 'YEM', 'Zambia': 'ZMB', 'Kosovo': 'XKX', 'N. Cyprus': '', 'Somaliland': '',
};
// mã nước của Passport -> mã ISO 3 chữ cái
export const CC2ISO = { jp: 'JPN', kr: 'KOR', cn: 'CHN', vn: 'VNM', fr: 'FRA', eg: 'EGY', us: 'USA', nz: 'NZL', in: 'IND', my: 'MYS', ch: 'CHE', ly: 'LBY', au: 'AUS', br: 'BRA', ar: 'ARG', gh: 'GHA', nl: 'NLD' };
