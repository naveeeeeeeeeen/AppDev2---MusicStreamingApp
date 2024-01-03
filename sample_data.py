from models import db, Song, Album
from werkzeug.security import generate_password_hash
from datastorefile import datastore

def initialize_sample_data():
    from main import app
    with app.app_context():
        db.create_all()
        datastore.find_or_create_role(name='admin', description='This is the admin role')
        datastore.find_or_create_role(name='artist', description='This is the artist role')
        datastore.find_or_create_role(name='user', description='This is the user role')
        db.session.commit()

        if not datastore.find_user(email='admin@email.com'):
            datastore.create_user(email='admin@email.com', username= 'admin', password=generate_password_hash('admin'), roles=['admin'])
        db.session.commit()


        albums = [Album(creator_name = "Mohit Chauhan", name = "Rockstar", year = 2011),
                Album(creator_name = "Selena Gomez", name = "For you", year = 2014),
                Album(creator_name = "Selena Gomez", name = "When the sun goes down", year = 2011),
                Album(creator_name = "Darbuka Siva", name = "Mudhal nee mudivum nee", year = 2022),
                Album(creator_name = "A.R. Rahman", name = "Achcham Yenbadhu", year = 2016),
                Album(creator_name = "Enya", name = "A Day Without Rain", year = 2000),
                Album(creator_name = "Tom Odell", name = "Long Way Down", year = 2013),
                Album(creator_name = "Justin Bieber", name = "Father Of Asahd", year = 2019),
                Album(creator_name = "Sukhwinder Singh", name = "Madaari", year = 2016),
                Album(creator_name = "Randwimps", name = "Your Name", year = 2016)]

        songs = [Song(name= "Phir se udd chala", creator_name= "Mohit Chauhan", album_id=1, lyrics= 
                    """फिर से उड़ चला
                        उड़ के छोड़ा है जहां नीचे
                        मैं तुम्हारे अब हूँ हवाले हवा
                        दूर-दूर लोग-बाग़ मीलों दूर ये वादियाँ

                        कर धुंआ धुंआ तन हर बदली चली आती है छूने
                        और कोई बदली कभी कहीं कर दे तन गीला ये है भी ना हो
                        किसी मंज़र पर मैं रुका नहीं
                        कभी खुद से भी मैं मिला नहीं
                        ये गिला तो है मैं खफ़ा नहीं
                        शहर एक से, गाँव एक से
                        लोग एक से, नाम एक
                        फिर से उड़ चला""", genre= 'Bollywood', duration= 213, likes= 5, play_count= 12),
                Song(name= "Jo Bhi Main", creator_name= "Mohit Chauhan", album_id=1, lyrics= 
                    """जो भी मैं कहना चाहूं
                        बर्बाद करे अल्फ़ाज़ मेरे
                        अल्फ़ाज़ मेरे

                        कभी मुझे लगे की जैसे
                        सारा ही ये जहाँ है जादू
                        जो है भी और नही भी है ये
                        फ़िज़ा, घटा, हवा, बहारें
                        मुझे करे इशारे ये
                        कैसे कहूँ?
                        कहानी मैं इनकी

                        जो भी मैं कहना चाहूं
                        बर्बाद करे अल्फ़ाज़ मेरे
                        अल्फ़ाज़ मेरे""", genre= 'Bollywood', duration= 292, likes= 4, play_count= 8),
                Song(name= "Hawaa Hawaa", creator_name= "Mohit Chauhan", album_id=1, lyrics= 
                    """Chakri si pairo mein pahiya pahiya aiya aiya oho
                        Aasmaan sarpat ghuma o o
                        Kahiye sunaaiye hum ne toh oh
                        Raani ghoome ghoome gore gore pairo se
                        chik chik chik chik jara
                        Rani phir nau do gyaraah
                        Raati to iske aadi
                        Ik din mein joote baarah
                        Raja ka chadh gaya pyara
                        Khabri ko paas pukara
                        Ye kya hai maajra dekho.. o o""", genre= 'Bollywood', duration= 313, likes= 8, play_count= 20),
                Song(name= "Kun Faya Kun", creator_name= "Mohit Chauhan", album_id=1, lyrics= 
                    """या निज़ामुद्दीन औलिया
                        या निज़ामुद्दीन सलक़ा

                        कदम बढ़ा ले
                        हदों को मिटा ले
                        आजा ख़ालीपन में पी का घर तेरा
                        तेरे बिन ख़ाली, आजा, ख़ालीपन में
                        तेरे बिन ख़ाली, आजा, ख़ालीपन में

                        रंगरेज़ा
                        रंगरेज़ा
                        रंगरेज़ा
                        रंगरेज़ा

                        كن فيكون، كن فيكون، فيكون
                        فيكون، فيكون، فيكون
                        كن فيكون، كن فيكون، فيكون
                        فيكون، فيكون، فيكون

                        जब कहीं पे कुछ नहीं भी नहीं था
                        वही था, वही था, वही था, वही था
                        जब कहीं पे कुछ नहीं भी नहीं था
                        वही था, वही था, वही था, वही था

                        वो जो मुझ में समाया
                        वो जो तुझ में समाया
                        मौला वही वही माया
                        वो जो मुझ में समाया
                        वो जो तुझ में समाया
                        मौला वही वही माया

                        كن فيكون، كن فيكون
                        صدق الله العلي العظيم

                        रंगरेज़ा रंग मेरा तन, मेरा मन
                        ले ले रंगाई चाहे तन, चाहे मन
                        रंगरेज़ा रंग मेरा तन, मेरा मन
                        ले ले रंगाई चाहे तन, चाहे मन

                        सजरा सवेरा मेरे तन बरसे
                        कजरा अँधेरा तेरी जलती लौ
                        सजरा सवेरा मेरे तन बरसे
                        कजरा अँधेरा तेरी जलती लौ
                        क़तरा मिला जो तेरे दर पर से
                        ओ मौला, मौला

                        كن فيكون، كن فيكون
                        كن فيكون، كن فيكون
                        كن فيكون، كن فيكون، فيكون
                        فيكون، فيكون، فيكون
                        كن فيكون، كن فيكون، فيكون
                        فيكون، فيكون، فيكون

                        जब कहीं पे कुछ नहीं भी नहीं था
                        वही था, वही था, वही था, वही था
                        जब कहीं पे कुछ नहीं भी नहीं था
                        वही था, वही था, वही था, वही था

                        كن فيكون، كن فيكون
                        صدق الله العلي العظيم
                        صدق رسوله النبي الكريم
                        صلّ الله عليه وسلم
                        صلّ الله عليه وسلم

                        ओ मुझपे करम सरकार तेरा
                        अर्ज़ तुझे, "कर दे मुझे मुझसे ही रिहा
                        अब मुझको भी हो दीदार मेरा
                        कर दे मुझे मुझसे ही रिहा
                        मुझसे ही रिहा"

                        मन के मेरे ये भरम
                        कच्चे मेरे ये करम
                        लेके चाले है कहाँ
                        मैं तो जानूँ ही ना

                        तू है मुझमें समाया
                        कहाँ लेके मुझे आया
                        मैं हूँ तुझमें समाया
                        तेरे पीछे चला आया
                        तेरा ही मैं एक साया

                        तूने मुझको बनाया
                        मैं तो जग को ना भाया
                        तुने गले से लगाया
                        हक़ तू ही है ख़ुदाया
                        सच तू ही है ख़ुदाया

                        كن فيكون، كن فيكون، فيكون
                        فيكون، فيكون، فيكون
                        كن فيكون، كن فيكون، فيكون
                        فيكون، فيكون، فيكون

                        जब कहीं पे कुछ नहीं भी नहीं था
                        वही था, वही था, वही था, वही था
                        जब कहीं पे कुछ नहीं भी नहीं था
                        वही था, वही था, वही था, वही था""", genre= 'Bollywood', duration= 381, likes= 11, play_count= 25),
                Song(name= "Come & get it", creator_name= "Selena Gomez", album_id=2, lyrics= 
                    """When you're ready come and get it
                        Na-na-na-na, na-na-na-na, na-na-na-na
                        When you're ready come and get it
                        Na-na-na-na, na-na-na-na, na-na-na-na
                        When you're ready, when you're ready
                        When you're ready come and get it
                        Na-na-na-na, na-na-na-na, na-na-na-na""", genre= 'Pop', duration= 276, likes= 2, play_count= 15),
                Song(name= "Who Says", creator_name= "Selena Gomez", album_id=3, lyrics= 
                    """I wouldn't wanna be anybody else, hey
                        You made me insecure
                        Told me I wasn't good enough
                        But who are you to judge?
                        When you're a diamond in the rough
                        I'm sure you got some things
                        You'd like to change about yourself
                        But when it comes to me
                        I wouldn't want to be anybody else
                        Na-na-na-na, na-na-na-na
                        Na-na-na-na, na
                        Na-na-na-na, na-na-na-na
                        Na-na-na-na, na
                        I'm no beauty queen
                        I'm just beautiful me""", genre= 'Pop', duration= 201, likes= 0, play_count= 4), 
                Song(name= "Mudhal nee mudivum nee", creator_name= "Darbuka Siva", album_id=4, lyrics= 
                    """ஆண் : ஆ… ஆஅ… ஆ…

                        ஆண் : முதல் நீ முடிவும் நீ…
                        மூன்று காலம் நீ…
                        கடல் நீ கரையும் நீ…
                        காற்று கூட நீ…

                        ஆண் : மனதோரம் ஒரு காயம்…
                        உன்னை எண்ணாத நாள் இல்லையே…
                        நானாக நானும் இல்லையே…

                        ஆண் : வழி எங்கும் பல பிம்பம்…
                        அதில் நான் சாய தோள் இல்லையே…
                        உன் போல யாரும் இல்லையே…

                        குழு (ஆண்கள்) : தீரா நதி நீதானடி…
                        நீந்தாமல் நான் மூழ்கி போனேன்…
                        நீதானடி வானில் மதி…
                        நீயல்ல நான்தானே தேய்ந்தேன்…""", genre= 'Tamil', duration= 336, likes= 9, play_count= 18),
                Song(name= "Rasaali", creator_name= "A.R. Rahman", album_id=5, lyrics= 
                    """Male : Parakkum rasaaliye rasaaliye nillu
                        Ingu nee vegama naan vegama sollu
                        Gadigaram poi sollum endre naan kandennn
                        Kizhakellam merkagida.. kandene

                        Female : Paravai pol aaginen pol aaginen indru
                        Siragum en kaigalum en kaigalum ondru

                        Male : Rasaaliiiee.. pandhayama.. pandhayama..
                        Nee mundhiya naan mundhiya paarpom parpomm

                        Mudhalil yaar solvadhu yaar solvadhu anbai
                        Mudhalil yaar eivadhu yaar Eivadhu ambai""", genre= 'Tamil', duration= 330, likes= 9, play_count= 9),
                Song(name= "Only Time", creator_name= "Enya", album_id=6, lyrics= 
                    """Who can say where the road goes
                        Where the day flows
                        Only time
                        And who can say if your love grows
                        As your heart chose
                        Only time
                        Who can say why your heart sighs
                        As your love flies
                        Only time
                        And who can say why your heart cries
                        When your love lies
                        Only time""", genre= 'New Age', duration= 218, likes= 19, play_count= 34),
                Song(name= "Another Love", creator_name= "Tom Odell", album_id=7, lyrics= 
                    """I wanna take you somewhere so you know I care
                        But it's so cold, and I don't know where
                        I brought you daffodils in a pretty string
                        But they won't flower like they did last spring
                        And I wanna kiss you, make you feel alright
                        I'm just so tired to share my nights
                        I wanna cry and I wanna love
                        But all my tears have been used up
                        On another love, another love
                        All my tears have been used up
                        On another love, another love
                        All my tears have been used up
                        On another love, another love
                        All my tears have been used up""", genre= 'Indie Rock', duration= 244, likes= 9, play_count= 26),
                Song(name= "No Brainer", creator_name= "Justin Bieber", album_id=8, lyrics= 
                    """We the Best Music!
                        Another one!
                        DJ Khaled!
                        You stick out of the crowd, baby, it's a no-brainer
                        It ain't that hard to choose
                        Him or me, be for real, baby, it's a no-brainer
                        You got your mind unloose
                        Go hard and watch the sun rise
                        One night'll change your whole life
                        Off top, drop-top, baby it's a no-brainer
                        Put 'em up if you with me
                        Yeah, yeah-eah, yeah, yeah-eah-eah
                        In the middle, woah
                        Woah-woah-oah, oh, oh-oh, ooh""", genre= 'Hip Hop', duration= 266, likes= 4, play_count= 9),
                Song(name= "Masoom Sa", creator_name= "Sukhwinder Singh", album_id=9, lyrics= 
                    """Palne me chand utra,
                        Khoobsurat khwaab jaisa
                        Godh mein usko uthata to
                        Mujhe lagta tha waisa.


                        Sara jahan mera hua
                        Sara jahan mera hua
                        Subah ki woh pehli dua yaa
                        Phool resham ka.

                        Masoom sa masoom sa
                        Mere aas pass tha
                        Masoom sa, mere aas pass tha
                        Masoom sa.""", genre= 'Bollywood', duration= 400, likes= 3, play_count= 19),
                Song(name= "Nandemonaiya", creator_name= "Radwimps", album_id=10, lyrics= 
                    """[Verse 1]
                        Futari no aida toorisugita kaze wa
                        Doko kara sabishisa wo hakondekita no
                        Naitari shita sono ato no sora wa
                        Yake ni sukitootteitari shitanda
                        Itsumo wa togatte tachichi no kotoba ga
                        Kyou wa atatakaku kanjimashita
                        Yasashisa mo egao mo yume no katarikata mo
                        Shiranakute zenbu kimi wo maneta yo

                        [Pre-Chorus]
                        Mou sukoshi dake de ii ato sukoshi dake de ii
                        Mou sukoshi dake de ii kara
                        Mou sukoshi dake de ii ato sukoshi dake de ii
                        Mou sukoshi dake kuttsuiteiyou ka""", genre= 'Japanese', duration= 344, likes= 5, play_count= 7)]

        for album in albums:
            if not Album.query.filter_by(name= album.name).first():
                db.session.add(album)
                
        for song in songs:
            if not Song.query.filter_by(name= song.name).first():
                db.session.add(song)

        db.session.commit()
            
