const IndigenousSIMSDATA = [[1.0000000000000002, 0.5465601643992212, 0.4147720752850741, 0.45150384756692236, 0.3296358970820321, 0.46316813833745474, 0.5396770757214637, 0.3947655809321188, 0.10828371528279537, 0.4811788784260075, 0.10757635032052114, 0.21706519703196647, 0.21752340191424407, 0.19853702755924388, 0.30170878783077726, -0.0644018135873545, -0.052131938966481224, -0.08761017030479777, 0.17609652934475767, 0.18351602682691548, -0.05372060635129399, -0.045707853716577235, 0.5166445639641124, 0.3398894902000825, 0.3197164636382512], [0.5465601643992212, 0.9999999999999999, 0.6152044206238236, 0.526167732316302, 0.3441005941215956, 0.550835562542232, 0.5485633948042801, 0.5279295452601785, 0.291044499030584, 0.5158986295859843, 0.4506023871790965, 0.2489003983069828, 0.22117978870130078, 0.37501228176351475, 0.45703440086683134, -0.012617891600591352, -0.022449128449142194, -0.1122684594256671, 0.1007030268977049, 0.2366466895959941, -0.07475504345350875, 0.015301160857434947, 0.5278546088321093, 0.660615576748654, 0.5027412751361592], [0.4147720752850741, 0.6152044206238236, 0.9999999999999999, 0.32430494582917996, 0.035649891909679196, 0.49155006247886723, 0.35508377876389113, 0.30819569456978885, 0.05092999439827902, 0.39356852608842485, 0.3907799447074366, 0.4522266345679281, -0.2369900137926639, 0.3990890608736076, 0.3891851796516142, -0.3714248574207495, -0.16430821053530315, -0.04456131900304795, -0.03717024808961007, 0.08149451559472964, -0.10548836554169948, -0.02543577182479668, 0.3788375027528845, 0.42978745856820255, 0.2480248461141785], [0.45150384756692236, 0.526167732316302, 0.32430494582917996, 1.0, 0.6188033089689418, 0.4891005878641327, 0.5113114555638991, 0.396435030082862, 0.2406799427903576, 0.6605933075943584, 0.28381449883536963, 0.09969354201122786, 0.15109991394256259, 0.10066332789114678, 0.17847292780069435, -0.0703881680566201, -0.0016358727898596475, 0.2160240120111259, 0.5707554192469273, 0.3351746129071436, 0.3373096841620452, 0.04431073075632169, 0.6053108514630697, 0.1876078462817583, 0.5854366968397766], [0.3296358970820321, 0.3441005941215956, 0.035649891909679196, 0.6188033089689418, 1.0000000000000002, 0.21011284184086682, 0.45881021101970065, 0.3595767521093939, 0.2209843293428733, 0.3192815623977988, 0.0662338962468819, 0.02517494121994624, 0.26758577139929407, -0.05976367332506134, 0.07577618748597863, 0.20707518128236588, 0.08566743469121904, 0.31896700690042173, 0.6813006741856114, 0.43277672923304383, 0.48342513916256935, -0.014859250701334955, 0.35260594357338254, 0.18810462292449553, 0.4105690964802337], [0.46316813833745474, 0.550835562542232, 0.49155006247886723, 0.4891005878641327, 0.21011284184086682, 1.0, 0.4681046471883897, 0.2553855675678379, 0.20851204674836724, 0.5208393070186634, 0.270302021799255, 0.44096724143214366, 0.07035864022756168, 0.3720279943163802, 0.3369963009457173, -0.1509472957798763, -0.01936209033753822, -0.11319493533046553, 0.010065917214549535, 0.06073162996972578, -0.01380495570445577, 0.19096699855533003, 0.4681446782788192, 0.4027886142495494, 0.5428289636531801], [0.5396770757214637, 0.5485633948042801, 0.35508377876389113, 0.5113114555638991, 0.45881021101970065, 0.4681046471883897, 1.0000000000000002, 0.5263969443453225, 0.4101376403888606, 0.49481317324876345, 0.3418496706463246, 0.12765930731449127, 0.30621449109985566, 0.3057231482982953, 0.5957186796200497, -0.2344093681963183, 0.1741066583523043, 0.12838499971338976, 0.45055744685864435, 0.5219840737929717, 0.14271432264129863, 0.11836377910317211, 0.5877490201719722, 0.4563758313396755, 0.3446045608412555], [0.3947655809321188, 0.5279295452601785, 0.30819569456978885, 0.396435030082862, 0.3595767521093939, 0.2553855675678379, 0.5263969443453225, 1.0, 0.2610625671246174, 0.4070310043891788, 0.29479716356971564, -0.024315566070688334, 0.05244275851158496, 0.09416572937706479, 0.36490386309078526, -0.044584108720176194, 0.02383742599698798, 0.0017936605967130456, 0.13662567883269094, 0.4338846220050451, 0.161902555788216, -0.00021827872205054894, 0.4981953088616421, 0.3937316731175833, 0.4222994029033282], [0.10828371528279537, 0.291044499030584, 0.05092999439827902, 0.2406799427903576, 0.2209843293428733, 0.20851204674836724, 0.4101376403888606, 0.2610625671246174, 0.9999999999999999, 0.2821573663726689, 0.1329918602979592, 0.028875209628112023, 0.22179005976284427, 0.2732036883872089, 0.4545554379332817, -0.07058681282016946, 0.14029630740084925, 0.17843810242609068, 0.18415223353236, 0.4082457474236541, 0.01611251984210913, 0.09088975576814923, 0.2059619120470248, 0.2672097048039985, 0.15949102940800836], [0.4811788784260075, 0.5158986295859843, 0.39356852608842485, 0.6605933075943584, 0.3192815623977988, 0.5208393070186634, 0.49481317324876345, 0.4070310043891788, 0.2821573663726689, 1.0, 0.2098567340496734, 0.13369235406497162, 0.056193584978075375, 0.18436242915504406, 0.33227004474643435, -0.13696082527592784, 0.06749616496876999, -0.025460144626406278, 0.1601420436889457, 0.3866613082756203, -0.02182400981954759, 0.06653769033059238, 0.5818967419732641, 0.28481671392684743, 0.48730872961026817], [0.10757635032052114, 0.4506023871790965, 0.3907799447074366, 0.28381449883536963, 0.0662338962468819, 0.270302021799255, 0.3418496706463246, 0.29479716356971564, 0.1329918602979592, 0.2098567340496734, 0.9999999999999999, 0.39373989965911826, -0.1960276992943495, 0.4566863676442116, 0.43556908507873543, -0.028931823386567208, -0.196864800583092, 0.012641248332279316, 0.1111917236519265, 0.09884380615269155, -0.018498091030984588, 0.0765518433270372, 0.20976083457551917, 0.5885236891988102, 0.011934041523111142], [0.21706519703196647, 0.2489003983069828, 0.4522266345679281, 0.09969354201122786, 0.02517494121994624, 0.44096724143214366, 0.12765930731449127, -0.024315566070688334, 0.028875209628112023, 0.13369235406497162, 0.39373989965911826, 1.0, -0.2801465167224474, 0.596423993842993, 0.34245044688509213, -0.1588586167314853, -0.0671464311284577, -0.09371497342205712, -0.028275306925797602, -0.1949327280195633, -0.05957582446489081, 0.13347916373754548, 0.24108746063822664, 0.34268021846674673, 0.03743800970297629], [0.21752340191424407, 0.22117978870130078, -0.2369900137926639, 0.15109991394256259, 0.26758577139929407, 0.07035864022756168, 0.30621449109985566, 0.05244275851158496, 0.22179005976284427, 0.056193584978075375, -0.1960276992943495, -0.2801465167224474, 0.9999999999999999, -0.23243763275784152, 0.07979524215143703, 0.0270522638256208, 0.3902978565990032, 0.13790080429894042, 0.21812879439834978, 0.29314907658460676, 0.24344835345468618, -0.15198748123565428, 0.14082246842714458, 0.042924223355778876, 0.24055123939161419], [0.19853702755924388, 0.37501228176351475, 0.3990890608736076, 0.10066332789114678, -0.05976367332506134, 0.3720279943163802, 0.3057231482982953, 0.09416572937706479, 0.2732036883872089, 0.18436242915504406, 0.4566863676442116, 0.596423993842993, -0.23243763275784152, 1.0, 0.4336527470525871, -0.16647348503760226, -0.18489851157279666, -0.1758205347441269, -0.04915768200695156, -0.10671618593521193, -0.20295335718541047, 0.32484619359851397, 0.3150729520974313, 0.42534329215890604, 0.10672860190076752], [0.30170878783077726, 0.45703440086683134, 0.3891851796516142, 0.17847292780069435, 0.07577618748597863, 0.3369963009457173, 0.5957186796200497, 0.36490386309078526, 0.4545554379332817, 0.33227004474643435, 0.43556908507873543, 0.34245044688509213, 0.07979524215143703, 0.4336527470525871, 1.0, -0.3188708276860588, -0.027486545687511573, 0.024153130268153876, 0.1239214390286559, 0.27157618153406554, -0.07663654556637324, 0.06330174665771801, 0.5140363202729448, 0.47320513179673224, 0.20701771707088076], [-0.0644018135873545, -0.012617891600591352, -0.3714248574207495, -0.0703881680566201, 0.20707518128236588, -0.1509472957798763, -0.2344093681963183, -0.044584108720176194, -0.07058681282016946, -0.13696082527592784, -0.028931823386567208, -0.1588586167314853, 0.0270522638256208, -0.16647348503760226, -0.3188708276860588, 1.0, -0.2058535371174817, 0.0010154866915554571, 0.014176361429782009, -0.11527181335809104, 0.006464197287778526, -0.05374462740140654, -0.28900145506097696, 0.08964603330948004, -0.022400163281119396], [-0.052131938966481224, -0.022449128449142194, -0.16430821053530315, -0.0016358727898596475, 0.08566743469121904, -0.01936209033753822, 0.1741066583523043, 0.02383742599698798, 0.14029630740084925, 0.06749616496876999, -0.196864800583092, -0.0671464311284577, 0.3902978565990032, -0.18489851157279666, -0.027486545687511573, -0.2058535371174817, 0.9999999999999999, 0.15333060944893415, 0.058969848656933783, 0.37330132949228817, 0.08100051493125625, 0.011320530897036246, 0.0618997691386576, 0.03731496680811746, -0.00544807087782213], [-0.08761017030479777, -0.1122684594256671, -0.04456131900304795, 0.2160240120111259, 0.31896700690042173, -0.11319493533046553, 0.12838499971338976, 0.0017936605967130456, 0.17843810242609068, -0.025460144626406278, 0.012641248332279316, -0.09371497342205712, 0.13790080429894042, -0.1758205347441269, 0.024153130268153876, 0.0010154866915554571, 0.15333060944893415, 1.0000000000000002, 0.6008017230435446, 0.3923176325453305, 0.6347554744029503, -0.2315777516952726, 0.023683580730273532, 0.041801103306856754, 0.23789034326877923], [0.17609652934475767, 0.1007030268977049, -0.03717024808961007, 0.5707554192469273, 0.6813006741856114, 0.010065917214549535, 0.45055744685864435, 0.13662567883269094, 0.18415223353236, 0.1601420436889457, 0.1111917236519265, -0.028275306925797602, 0.21812879439834978, -0.04915768200695156, 0.1239214390286559, 0.014176361429782009, 0.058969848656933783, 0.6008017230435446, 1.0, 0.42051149094120227, 0.6821538270868821, 0.019281844608517278, 0.2810781279924642, -0.015424419600140536, 0.30965425357724086], [0.18351602682691548, 0.2366466895959941, 0.08149451559472964, 0.3351746129071436, 0.43277672923304383, 0.06073162996972578, 0.5219840737929717, 0.4338846220050451, 0.4082457474236541, 0.3866613082756203, 0.09884380615269155, -0.1949327280195633, 0.29314907658460676, -0.10671618593521193, 0.27157618153406554, -0.11527181335809104, 0.37330132949228817, 0.3923176325453305, 0.42051149094120227, 0.9999999999999999, 0.31199981004060773, -0.05154067658464386, 0.2032997563947899, 0.2015505058582833, 0.33563077020220616], [-0.05372060635129399, -0.07475504345350875, -0.10548836554169948, 0.3373096841620452, 0.48342513916256935, -0.01380495570445577, 0.14271432264129863, 0.161902555788216, 0.01611251984210913, -0.02182400981954759, -0.018498091030984588, -0.05957582446489081, 0.24344835345468618, -0.20295335718541047, -0.07663654556637324, 0.006464197287778526, 0.08100051493125625, 0.6347554744029503, 0.6821538270868821, 0.31199981004060773, 1.0, -0.1708028786724087, 0.07655379477135006, -0.17656195389299026, 0.39355446562222823], [-0.045707853716577235, 0.015301160857434947, -0.02543577182479668, 0.04431073075632169, -0.014859250701334955, 0.19096699855533003, 0.11836377910317211, -0.00021827872205054894, 0.09088975576814923, 0.06653769033059238, 0.0765518433270372, 0.13347916373754548, -0.15198748123565428, 0.32484619359851397, 0.06330174665771801, -0.05374462740140654, 0.011320530897036246, -0.2315777516952726, 0.019281844608517278, -0.05154067658464386, -0.1708028786724087, 1.0, 0.19514732359736645, 0.06451282195720595, -0.028351120839346284], [0.5166445639641124, 0.5278546088321093, 0.3788375027528845, 0.6053108514630697, 0.35260594357338254, 0.4681446782788192, 0.5877490201719722, 0.4981953088616421, 0.2059619120470248, 0.5818967419732641, 0.20976083457551917, 0.24108746063822664, 0.14082246842714458, 0.3150729520974313, 0.5140363202729448, -0.28900145506097696, 0.0618997691386576, 0.023683580730273532, 0.2810781279924642, 0.2032997563947899, 0.07655379477135006, 0.19514732359736645, 1.0000000000000002, 0.3005642823676258, 0.6207409444380102], [0.3398894902000825, 0.660615576748654, 0.42978745856820255, 0.1876078462817583, 0.18810462292449553, 0.4027886142495494, 0.4563758313396755, 0.3937316731175833, 0.2672097048039985, 0.28481671392684743, 0.5885236891988102, 0.34268021846674673, 0.042924223355778876, 0.42534329215890604, 0.47320513179673224, 0.08964603330948004, 0.03731496680811746, 0.041801103306856754, -0.015424419600140536, 0.2015505058582833, -0.17656195389299026, 0.06451282195720595, 0.3005642823676258, 1.0000000000000002, 0.1667301230207673], [0.3197164636382512, 0.5027412751361592, 0.2480248461141785, 0.5854366968397766, 0.4105690964802337, 0.5428289636531801, 0.3446045608412555, 0.4222994029033282, 0.15949102940800836, 0.48730872961026817, 0.011934041523111142, 0.03743800970297629, 0.24055123939161419, 0.10672860190076752, 0.20701771707088076, -0.022400163281119396, -0.00544807087782213, 0.23789034326877923, 0.30965425357724086, 0.33563077020220616, 0.39355446562222823, -0.028351120839346284, 0.6207409444380102, 0.1667301230207673, 1.0]];

export default IndigenousSIMSDATA;