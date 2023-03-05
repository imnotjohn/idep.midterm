// 200 Epochs

const INDSIMS200 = [[1.0000000000000002, 0.4536887799238835, 0.34981838133578247, 0.3817827115157296, 0.2822781662879279, 0.501662315902601, 0.457863224397768, 0.37917228986792834, -0.02175813846894129, 0.416544061775536, 0.10212900901635619, 0.17638155492605298, 0.13386655909451234, 0.26391990440265584, 0.2795385077819527, -0.08595987915395992, -0.19275243487305416, -0.13262724196059583, 0.104143414946725, 0.060094398368524794, -0.03508892067915011, -0.05455987468332656, 0.4742868481453098, 0.22256779702976318, 0.28917637655670236], [0.4536887799238835, 0.9999999999999998, 0.5174595914906409, 0.4956906408292799, 0.3828693354387622, 0.5648206836169798, 0.5309566115851792, 0.5833862714961316, 0.23665855826744808, 0.5210563980050921, 0.4098372474988174, 0.3279211595297864, 0.1786955202720792, 0.4020953870392537, 0.4225307497328273, -0.17720814986014125, -0.11346584614286777, -0.07392203108610174, 0.06974808017050511, 0.13294126684991564, -0.10807046299755955, -0.05075659230450512, 0.4798643367737088, 0.6745606998545645, 0.5513712897390315], [0.34981838133578247, 0.5174595914906409, 0.9999999999999999, 0.2352423525927196, -0.011968106394219073, 0.4793273787217667, 0.3715226274551484, 0.25744679929573705, 0.06891998076670941, 0.3822791812085602, 0.28911952988342304, 0.4448232961707871, -0.27221888793763194, 0.3599582133288094, 0.3330378576661945, -0.29758615050442283, -0.1967175784580503, -0.027413057174413495, -0.12361833817673809, 0.0644739700143491, -0.13819814348352674, 0.00443778771758638, 0.23412140561293587, 0.38782802412456263, 0.18068950716468402], [0.3817827115157296, 0.4956906408292799, 0.2352423525927196, 1.0, 0.6390114443118482, 0.4310137561792105, 0.4595656088176161, 0.3191883445295827, 0.1631499238115595, 0.6938011080794905, 0.27051303670531435, 0.08512828454972031, 0.19201511967623225, -0.01443504685005652, 0.13616438092842822, -0.10201581898371842, -0.10315885982395458, 0.13844898665501645, 0.5418418135483983, 0.2337323521977087, 0.34682732353787943, -0.047839312986626345, 0.5254223239062877, 0.1868154481453859, 0.5041996735056077], [0.2822781662879279, 0.3828693354387622, -0.011968106394219073, 0.6390114443118482, 0.9999999999999999, 0.17812213028303067, 0.366627631688054, 0.3005835124018527, 0.07209535498348318, 0.33100332607717897, 0.06806690952481488, 0.11024936066518373, 0.24190750316440668, -0.13336208563321297, 0.10889536711566133, -0.020867758474991765, -0.055877836161868234, 0.339644666009563, 0.6636561524289368, 0.31041526130720637, 0.5124734275039292, -0.13963525805050173, 0.38040333733981185, 0.13794881826439231, 0.4337295589605168], [0.501662315902601, 0.5648206836169798, 0.4793273787217667, 0.4310137561792105, 0.17812213028303067, 1.0, 0.44905095477927814, 0.25002867481834634, 0.16301939976095794, 0.5186209468985294, 0.30259856008430863, 0.37514551414781716, 0.10712810345594177, 0.36592181358820236, 0.26883690459105186, -0.2062417734895961, -0.10141794340261426, -0.12368872583423891, -0.02551625899606419, 0.0028581173219978076, 0.005651174936022185, 0.20239481666110837, 0.41327344017977846, 0.36252435301689817, 0.5530291504355178], [0.457863224397768, 0.5309566115851792, 0.3715226274551484, 0.4595656088176161, 0.366627631688054, 0.44905095477927814, 1.0, 0.5173765649929958, 0.38748870265394453, 0.5475980414419397, 0.3115295189550923, 0.061757778786746105, 0.2123534673375275, 0.22060690346138215, 0.5725155766872966, -0.2746373122669916, 0.14098034124357045, 0.20050332704340293, 0.3811164126652252, 0.5244171658556193, 0.14323281299771934, 0.05399360974109631, 0.57207832921272, 0.48591332071385945, 0.35313326928616223], [0.37917228986792834, 0.5833862714961316, 0.25744679929573705, 0.3191883445295827, 0.3005835124018527, 0.25002867481834634, 0.5173765649929958, 0.9999999999999998, 0.15573610670430446, 0.3048010966874438, 0.3186714489027555, -0.007467450648354018, 0.10919841705264738, -0.014946346802572702, 0.39974261333890143, -0.048784491396658636, 0.051149198681116115, -0.12673327028134784, 0.09237148556889338, 0.3789611178926167, 0.046305862658874215, 0.033431317740621073, 0.3330685539287515, 0.42143676900529997, 0.2861754545531927], [-0.02175813846894129, 0.23665855826744808, 0.06891998076670941, 0.1631499238115595, 0.07209535498348318, 0.16301939976095794, 0.38748870265394453, 0.15573610670430446, 1.0, 0.2671002332618772, -0.014502547772010745, 0.03920181564170657, 0.04871125368698561, 0.21105883961992739, 0.41424836308714563, -0.05125414360067892, 0.17334838948695686, 0.18850592516828363, 0.06375349463129408, 0.3817538645952295, -0.11594163648115142, 0.15754205538746507, 0.23027787053796714, 0.33411516833308297, 0.11072982463380013], [0.416544061775536, 0.5210563980050921, 0.3822791812085602, 0.6938011080794905, 0.33100332607717897, 0.5186209468985294, 0.5475980414419397, 0.3048010966874438, 0.2671002332618772, 1.0, 0.20284281353794031, 0.10018459080767758, 0.08576031351778646, 0.08392881448917121, 0.2535543719236066, -0.2093817416169888, -0.02321074859593767, -0.030525927616497486, 0.1009566162700742, 0.3165826400425953, -0.045994195209994544, 0.00444411306572877, 0.5262352979190924, 0.3209738107264393, 0.45306833406062225], [0.10212900901635619, 0.4098372474988174, 0.28911952988342304, 0.27051303670531435, 0.06806690952481488, 0.30259856008430863, 0.3115295189550923, 0.3186714489027555, -0.014502547772010745, 0.20284281353794031, 0.9999999999999999, 0.09593597485599219, -0.08145774236960021, 0.3034265338598165, 0.30725548778640066, -0.0002716395548863076, -0.21956120792213132, 0.013006930811657345, 0.11916077530381232, 0.021046243293286398, -0.02639139626019993, 0.15598256273432434, 0.13395918120142897, 0.5518543805029034, 0.03315378942956825], [0.17638155492605298, 0.3279211595297864, 0.4448232961707871, 0.08512828454972031, 0.11024936066518373, 0.37514551414781716, 0.061757778786746105, -0.007467450648354018, 0.03920181564170657, 0.10018459080767758, 0.09593597485599219, 1.0, -0.2941480566713833, 0.5221746704385541, 0.26974837311741773, -0.26812968975831003, -0.05313028992924277, -0.058520894325806816, -0.0036882706126844067, -0.1979394101462901, -0.06544825737936281, 0.04032275391342763, 0.1322328534986992, 0.26182533506372946, 0.14382842004055058], [0.13386655909451234, 0.1786955202720792, -0.27221888793763194, 0.19201511967623225, 0.24190750316440668, 0.10712810345594177, 0.2123534673375275, 0.10919841705264738, 0.04871125368698561, 0.08576031351778646, -0.08145774236960021, -0.2941480566713833, 0.9999999999999998, -0.17373377459153416, 0.03498112488050036, -0.04573902263286801, 0.3540678139597718, 0.09624325166757174, 0.22406346941760036, 0.20701011202825753, 0.2639331510654835, -0.2251340815353287, 0.1632947436989238, 0.023392073747029472, 0.2845669235964047], [0.26391990440265584, 0.4020953870392537, 0.3599582133288094, -0.01443504685005652, -0.13336208563321297, 0.36592181358820236, 0.22060690346138215, -0.014946346802572702, 0.21105883961992739, 0.08392881448917121, 0.3034265338598165, 0.5221746704385541, -0.17373377459153416, 1.0, 0.3960434396161358, -0.1500543672486016, -0.14230733282629449, -0.12909755083770275, -0.08411265750220985, -0.1280659248080469, -0.24653733903589004, 0.31048290764561454, 0.2484425691757746, 0.3672147137416579, 0.10373061183596807], [0.2795385077819527, 0.4225307497328273, 0.3330378576661945, 0.13616438092842822, 0.10889536711566133, 0.26883690459105186, 0.5725155766872966, 0.39974261333890143, 0.41424836308714563, 0.2535543719236066, 0.30725548778640066, 0.26974837311741773, 0.03498112488050036, 0.3960434396161358, 1.0, -0.348882014111772, -0.02161689407611907, 0.040476922391669265, 0.13694750639274117, 0.24745880094173278, -0.11957277081447612, 0.03389614692159791, 0.4326046776162979, 0.4841211956388382, 0.1816621151825142], [-0.08595987915395992, -0.17720814986014125, -0.29758615050442283, -0.10201581898371842, -0.020867758474991765, -0.2062417734895961, -0.2746373122669916, -0.048784491396658636, -0.05125414360067892, -0.2093817416169888, -0.0002716395548863076, -0.26812968975831003, -0.04573902263286801, -0.1500543672486016, -0.348882014111772, 1.0, -0.19027644399149596, 0.0431729645934825, 0.047528613816440544, -0.09079821176925904, -0.02366049816052212, 0.1437349353783745, -0.31985792833638754, -0.1401121155349085, -0.08827319447959847], [-0.19275243487305416, -0.11346584614286777, -0.1967175784580503, -0.10315885982395458, -0.055877836161868234, -0.10141794340261426, 0.14098034124357045, 0.051149198681116115, 0.17334838948695686, -0.02321074859593767, -0.21956120792213132, -0.05313028992924277, 0.3540678139597718, -0.14230733282629449, -0.02161689407611907, -0.19027644399149596, 1.0, 0.20840008750760283, 0.011778511449745312, 0.3367561315173746, 0.08532823644577223, 0.05249761425648444, 0.0009350208115498516, 0.08915526421735018, -0.038618658078077066], [-0.13262724196059583, -0.07392203108610174, -0.027413057174413495, 0.13844898665501645, 0.339644666009563, -0.12368872583423891, 0.20050332704340293, -0.12673327028134784, 0.18850592516828363, -0.030525927616497486, 0.013006930811657345, -0.058520894325806816, 0.09624325166757174, -0.12909755083770275, 0.040476922391669265, 0.0431729645934825, 0.20840008750760283, 1.0, 0.5642449620257501, 0.4756657987404826, 0.5565774485467244, -0.012258596413220932, 0.08076293012552879, 0.039823472636276835, 0.19641206402591038], [0.104143414946725, 0.06974808017050511, -0.12361833817673809, 0.5418418135483983, 0.6636561524289368, -0.02551625899606419, 0.3811164126652252, 0.09237148556889338, 0.06375349463129408, 0.1009566162700742, 0.11916077530381232, -0.0036882706126844067, 0.22406346941760036, -0.08411265750220985, 0.13694750639274117, 0.047528613816440544, 0.011778511449745312, 0.5642449620257501, 0.9999999999999998, 0.3037417979037264, 0.7101027156900585, 0.0009342557949427344, 0.3070677081260178, -0.05651620807174128, 0.26387520898116146], [0.060094398368524794, 0.13294126684991564, 0.0644739700143491, 0.2337323521977087, 0.31041526130720637, 0.0028581173219978076, 0.5244171658556193, 0.3789611178926167, 0.3817538645952295, 0.3165826400425953, 0.021046243293286398, -0.1979394101462901, 0.20701011202825753, -0.1280659248080469, 0.24745880094173278, -0.09079821176925904, 0.3367561315173746, 0.4756657987404826, 0.3037417979037264, 1.0, 0.2806793877737291, 0.030902616735959607, 0.15628596316477653, 0.24449332317867917, 0.2766146126446349], [-0.03508892067915011, -0.10807046299755955, -0.13819814348352674, 0.34682732353787943, 0.5124734275039292, 0.005651174936022185, 0.14323281299771934, 0.046305862658874215, -0.11594163648115142, -0.045994195209994544, -0.02639139626019993, -0.06544825737936281, 0.2639331510654835, -0.24653733903589004, -0.11957277081447612, -0.02366049816052212, 0.08532823644577223, 0.5565774485467244, 0.7101027156900585, 0.2806793877737291, 1.0000000000000002, -0.016562438972215404, 0.05247606157007189, -0.24934355994868268, 0.341241945536301], [-0.05455987468332656, -0.05075659230450512, 0.00443778771758638, -0.047839312986626345, -0.13963525805050173, 0.20239481666110837, 0.05399360974109631, 0.033431317740621073, 0.15754205538746507, 0.00444411306572877, 0.15598256273432434, 0.04032275391342763, -0.2251340815353287, 0.31048290764561454, 0.03389614692159791, 0.1437349353783745, 0.05249761425648444, -0.012258596413220932, 0.0009342557949427344, 0.030902616735959607, -0.016562438972215404, 1.0, 0.14848740847870096, 0.03816839092625474, 0.016523497709923674], [0.4742868481453098, 0.4798643367737088, 0.23412140561293587, 0.5254223239062877, 0.38040333733981185, 0.41327344017977846, 0.57207832921272, 0.3330685539287515, 0.23027787053796714, 0.5262352979190924, 0.13395918120142897, 0.1322328534986992, 0.1632947436989238, 0.2484425691757746, 0.4326046776162979, -0.31985792833638754, 0.0009350208115498516, 0.08076293012552879, 0.3070677081260178, 0.15628596316477653, 0.05247606157007189, 0.14848740847870096, 0.9999999999999999, 0.24228463946111203, 0.5519276843444947], [0.22256779702976318, 0.6745606998545645, 0.38782802412456263, 0.1868154481453859, 0.13794881826439231, 0.36252435301689817, 0.48591332071385945, 0.42143676900529997, 0.33411516833308297, 0.3209738107264393, 0.5518543805029034, 0.26182533506372946, 0.023392073747029472, 0.3672147137416579, 0.4841211956388382, -0.1401121155349085, 0.08915526421735018, 0.039823472636276835, -0.05651620807174128, 0.24449332317867917, -0.24934355994868268, 0.03816839092625474, 0.24228463946111203, 1.0000000000000002, 0.15333794637947243], [0.28917637655670236, 0.5513712897390315, 0.18068950716468402, 0.5041996735056077, 0.4337295589605168, 0.5530291504355178, 0.35313326928616223, 0.2861754545531927, 0.11072982463380013, 0.45306833406062225, 0.03315378942956825, 0.14382842004055058, 0.2845669235964047, 0.10373061183596807, 0.1816621151825142, -0.08827319447959847, -0.038618658078077066, 0.19641206402591038, 0.26387520898116146, 0.2766146126446349, 0.341241945536301, 0.016523497709923674, 0.5519276843444947, 0.15333794637947243, 0.9999999999999998]];

export default INDSIMS200;