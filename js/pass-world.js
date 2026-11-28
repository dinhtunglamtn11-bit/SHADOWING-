// Bản đồ các châu → khu vực → nước của Passport. Mỗi nước viết 'Tên Việt|Tên Anh' và thêm '|mã' nếu đã có thẻ (mã khớp setCC trong pass-xx*.js).
const L = s => s.split(';').map(x => x.trim()).filter(Boolean);
const R = (k, vi, en, list) => ({ k, vi, en, c: L(list) });

export const WORLD = [
  { k: 'as', vi: 'Châu Á', en: 'Asia', regions: [
    R('sea', 'Đông Nam Á', 'Southeast Asia', 'Việt Nam|Vietnam|vn; Thái Lan|Thailand; Indonesia|Indonesia; Malaysia|Malaysia|my; Singapore|Singapore; Philippines|Philippines; Lào|Laos; Campuchia|Cambodia; Myanmar|Myanmar; Brunei|Brunei; Timor-Leste|Timor-Leste'),
    R('ea', 'Đông Á', 'East Asia', 'Trung Quốc|China|cn; Nhật Bản|Japan|jp; Hàn Quốc|South Korea|kr; Triều Tiên|North Korea; Mông Cổ|Mongolia'),
    R('sa', 'Nam Á', 'South Asia', 'Ấn Độ|India|in; Pakistan|Pakistan; Bangladesh|Bangladesh; Sri Lanka|Sri Lanka; Nepal|Nepal; Bhutan|Bhutan; Maldives|Maldives; Afghanistan|Afghanistan'),
    R('wa', 'Tây Á (Trung Đông)', 'West Asia (Middle East)', 'Ả Rập Xê Út|Saudi Arabia|sa; UAE|United Arab Emirates; Qatar|Qatar; Kuwait|Kuwait; Oman|Oman; Bahrain|Bahrain; Iraq|Iraq; Iran|Iran; Syria|Syria; Jordan|Jordan; Liban|Lebanon; Israel|Israel; Palestine|Palestine; Thổ Nhĩ Kỳ|Turkey; Síp|Cyprus; Gruzia|Georgia; Armenia|Armenia; Azerbaijan|Azerbaijan'),
    R('ca', 'Trung Á', 'Central Asia', 'Kazakhstan|Kazakhstan; Uzbekistan|Uzbekistan; Turkmenistan|Turkmenistan; Kyrgyzstan|Kyrgyzstan; Tajikistan|Tajikistan'),
  ] },
  { k: 'af', vi: 'Châu Phi', en: 'Africa', regions: [
    R('na', 'Bắc Phi', 'North Africa', 'Ai Cập|Egypt|eg; Libya|Libya|ly; Tunisia|Tunisia; Algérie|Algeria; Maroc|Morocco; Sudan|Sudan'),
    R('wf', 'Tây Phi', 'West Africa', 'Nigeria|Nigeria; Ghana|Ghana|gh; Bờ Biển Ngà|Côte d\'Ivoire; Senegal|Senegal; Mali|Mali; Burkina Faso|Burkina Faso; Niger|Niger; Guinea|Guinea; Sierra Leone|Sierra Leone; Liberia|Liberia|lr; Togo|Togo; Bénin|Benin; Mauritanie|Mauritania; Gambia|Gambia; Guinea-Bissau|Guinea-Bissau; Cabo Verde|Cabo Verde'),
    R('cf', 'Trung Phi', 'Central Africa', 'CHDC Congo|DR Congo; Cộng hòa Congo|Republic of the Congo; Cameroon|Cameroon; Cộng hòa Trung Phi|Central African Republic; Tchad|Chad; Gabon|Gabon; Guinea Xích Đạo|Equatorial Guinea; São Tomé và Príncipe|São Tomé and Príncipe'),
    R('ef', 'Đông Phi', 'East Africa', 'Ethiopia|Ethiopia; Kenya|Kenya; Tanzania|Tanzania; Uganda|Uganda; Rwanda|Rwanda; Burundi|Burundi; Nam Sudan|South Sudan; Somalia|Somalia; Djibouti|Djibouti; Eritrea|Eritrea; Madagascar|Madagascar|mg; Mauritius|Mauritius; Seychelles|Seychelles; Comoros|Comoros'),
    R('sf', 'Nam Phi', 'Southern Africa', 'Nam Phi|South Africa; Botswana|Botswana; Namibia|Namibia; Zimbabwe|Zimbabwe; Zambia|Zambia; Mozambique|Mozambique; Angola|Angola|ao; Malawi|Malawi; Lesotho|Lesotho; Eswatini|Eswatini'),
  ] },
  { k: 'eu', vi: 'Châu Âu', en: 'Europe', regions: [
    R('we', 'Tây Âu & Bắc Âu', 'Western & Northern Europe', 'Pháp|France|fr; Đức|Germany; Anh|United Kingdom; Ireland|Ireland; Hà Lan|Netherlands|nl; Bỉ|Belgium; Luxembourg|Luxembourg; Thụy Sĩ|Switzerland|ch; Áo|Austria; Thụy Điển|Sweden; Na Uy|Norway; Phần Lan|Finland; Đan Mạch|Denmark; Iceland|Iceland'),
    R('se', 'Nam Âu', 'Southern Europe', 'Ý|Italy|it; Tây Ban Nha|Spain; Bồ Đào Nha|Portugal|pt; Hy Lạp|Greece; Croatia|Croatia; Slovenia|Slovenia; Serbia|Serbia; Montenegro|Montenegro; Bosna và Hercegovina|Bosnia and Herzegovina; Bắc Macedonia|North Macedonia; Albania|Albania; Malta|Malta; San Marino|San Marino; Vatican|Vatican City; Andorra|Andorra'),
    R('ee', 'Đông Âu & Trung Âu', 'Eastern & Central Europe', 'Ba Lan|Poland; Cộng hòa Séc|Czech Republic; Slovakia|Slovakia; Hungary|Hungary; România|Romania; Bulgaria|Bulgaria; Ukraina|Ukraine; Belarus|Belarus; Moldova|Moldova; Nga|Russia|ru; Estonia|Estonia; Latvia|Latvia; Litva|Lithuania'),
  ] },
  { k: 'am', vi: 'Châu Mỹ', en: 'Americas', regions: [
    R('nca', 'Bắc Mỹ & Trung Mỹ', 'North & Central America', 'Hoa Kỳ|United States|us; Canada|Canada|ca; México|Mexico; Guatemala|Guatemala; Belize|Belize; Honduras|Honduras; El Salvador|El Salvador; Nicaragua|Nicaragua; Costa Rica|Costa Rica; Panamá|Panama'),
    R('car', 'Ca-ri-bê', 'Caribbean', 'Cuba|Cuba; Jamaica|Jamaica; Haiti|Haiti; Cộng hòa Dominica|Dominican Republic; Bahamas|Bahamas; Barbados|Barbados; Trinidad và Tobago|Trinidad and Tobago; Saint Lucia|Saint Lucia; Saint Vincent và Grenadines|Saint Vincent and the Grenadines; Grenada|Grenada; Antigua và Barbuda|Antigua and Barbuda; Dominica|Dominica; Saint Kitts và Nevis|Saint Kitts and Nevis'),
    R('sam', 'Nam Mỹ', 'South America', 'Brasil|Brazil|br; Argentina|Argentina|ar; Colombia|Colombia; Peru|Peru; Venezuela|Venezuela; Chile|Chile; Ecuador|Ecuador; Bolivia|Bolivia; Paraguay|Paraguay; Uruguay|Uruguay; Guyana|Guyana; Suriname|Suriname'),
  ] },
  { k: 'oc', vi: 'Châu Đại Dương', en: 'Oceania', regions: [
    R('oce', 'Châu Đại Dương (Úc)', 'Oceania (Australia)', 'Úc|Australia|au; New Zealand|New Zealand|nz; Papua New Guinea|Papua New Guinea; Fiji|Fiji; Quần đảo Solomon|Solomon Islands; Vanuatu|Vanuatu; Samoa|Samoa; Tonga|Tonga; Kiribati|Kiribati; Micronesia|Micronesia; Quần đảo Marshall|Marshall Islands; Palau|Palau; Nauru|Nauru; Tuvalu|Tuvalu'),
  ] },
  { k: 'an', vi: 'Châu Nam Cực', en: 'Antarctica', note: ['Không có quốc gia độc lập hay dân cư sinh sống vĩnh viễn; chỉ có các trạm nghiên cứu khoa học quốc tế.', 'No independent countries or permanent residents; only international research stations.'], regions: [] },
];

