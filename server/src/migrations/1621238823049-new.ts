import {MigrationInterface, QueryRunner} from "typeorm";

export class new1621238823040 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`insert into post (title, text, "creatorId", "createdAt") values ('Film ist a Girl & a Gun', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

        Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 37, '1612745314000');
        insert into post (title, text, "creatorId", "createdAt") values ('Kissed by Winter (Vinterkyss)', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.
        
        Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.
        
        Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 37, '1611468245000');
        insert into post (title, text, "creatorId", "createdAt") values ('The Man Who Shook the Hand of Vicente Fernandez', 'In congue. Etiam justo. Etiam pretium iaculis justo.
        
        In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 37, '1592488296000');
        insert into post (title, text, "creatorId", "createdAt") values ('Losers'' Club (Kaybedenler kulübü)', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 37, '1591867689000');
        insert into post (title, text, "creatorId", "createdAt") values ('Stars in Shorts', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.
        
        In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 37, '1609625673000');
        insert into post (title, text, "creatorId", "createdAt") values ('Caught Inside', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.
        
        Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 37, '1607988532000');
        insert into post (title, text, "creatorId", "createdAt") values ('Bug''s Life, A', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.
        
        In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.
        
        Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 37, '1609823779000');
        insert into post (title, text, "creatorId", "createdAt") values ('WolfCop', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 37, '1607900455000');
        insert into post (title, text, "creatorId", "createdAt") values ('Brave', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.
        
        Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.
        
        Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 37, '1615511222000');
        insert into post (title, text, "creatorId", "createdAt") values ('Scenes from a Mall', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.
        
        Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.
        
        In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 37, '1604540493000');
        insert into post (title, text, "creatorId", "createdAt") values ('Martyrs', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 37, '1615225322000');
        insert into post (title, text, "creatorId", "createdAt") values ('Dead Awake', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.
        
        Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 37, '1620936431000');
        insert into post (title, text, "creatorId", "createdAt") values ('Greening of Whitney Brown, The', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 37, '1603694988000');
        insert into post (title, text, "creatorId", "createdAt") values ('Girl from Monaco, The (fille de Monaco, La)', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.
        
        Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 37, '1601299150000');
        insert into post (title, text, "creatorId", "createdAt") values ('Conversations with My Gardener (Dialogue avec mon jardinier)', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.
        
        Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 37, '1591825585000');
        insert into post (title, text, "creatorId", "createdAt") values ('C.H.U.D.', 'In congue. Etiam justo. Etiam pretium iaculis justo.
        
        In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.
        
        Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 37, '1594120552000');
        insert into post (title, text, "creatorId", "createdAt") values ('Car Bonus (Autobonus)', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.
        
        Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 37, '1605310545000');
        insert into post (title, text, "creatorId", "createdAt") values ('Guarding Tess', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.
        
        Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.
        
        Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 37, '1613881753000');
        insert into post (title, text, "creatorId", "createdAt") values ('Misérables in Concert, Les', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.
        
        Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.
        
        Phasellus in felis. Donec semper sapien a libero. Nam dui.', 37, '1620720427000');
        insert into post (title, text, "creatorId", "createdAt") values ('High Anxiety', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.
        
        Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.
        
        Phasellus in felis. Donec semper sapien a libero. Nam dui.', 37, '1596166586000');
        insert into post (title, text, "creatorId", "createdAt") values ('After.Life', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.
        
        Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 37, '1596667495000');
        insert into post (title, text, "creatorId", "createdAt") values ('Mischief', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 37, '1600014867000');
        insert into post (title, text, "creatorId", "createdAt") values ('Colony, The', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 37, '1605907019000');
        insert into post (title, text, "creatorId", "createdAt") values ('Providence', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.
        
        Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.
        
        Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 37, '1615042472000');
        insert into post (title, text, "creatorId", "createdAt") values ('Nightwing', 'Fusce consequat. Nulla nisl. Nunc nisl.
        
        Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 37, '1616273985000');
        insert into post (title, text, "creatorId", "createdAt") values ('Battlestar Galactica: Razor', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.
        
        Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 37, '1590145605000');
        insert into post (title, text, "creatorId", "createdAt") values ('Dracula: Dead and Loving It', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.
        
        Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 37, '1593665521000');
        insert into post (title, text, "creatorId", "createdAt") values ('Mary', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.
        
        Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.
        
        Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 37, '1600710859000');
        insert into post (title, text, "creatorId", "createdAt") values ('Cadence', 'Fusce consequat. Nulla nisl. Nunc nisl.', 37, '1605911662000');
        insert into post (title, text, "creatorId", "createdAt") values ('Killing Us Softly 4: Advertising''s Image of Women', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 37, '1618553232000');
        insert into post (title, text, "creatorId", "createdAt") values ('Our Beloved Month of August (Aquele Querido Mês de Agosto)', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 37, '1607679956000');
        insert into post (title, text, "creatorId", "createdAt") values ('Beneath the Dark', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.
        
        Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 37, '1591424265000');
        insert into post (title, text, "creatorId", "createdAt") values ('Hitchcock', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 37, '1590433686000');
        insert into post (title, text, "creatorId", "createdAt") values ('Bliss', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.
        
        Sed ante. Vivamus tortor. Duis mattis egestas metus.', 37, '1590681155000');
        insert into post (title, text, "creatorId", "createdAt") values ('The Natural Love', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 37, '1603024899000');
        insert into post (title, text, "creatorId", "createdAt") values ('Jaws 2', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 37, '1610536567000');
        insert into post (title, text, "creatorId", "createdAt") values ('Who Pulled the Plug? (Göta kanal eller Vem drog ur proppen?)', 'In congue. Etiam justo. Etiam pretium iaculis justo.
        
        In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.
        
        Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 37, '1615600596000');
        insert into post (title, text, "creatorId", "createdAt") values ('Contraband', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 37, '1611670022000');
        insert into post (title, text, "creatorId", "createdAt") values ('G.B.F.', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.
        
        Phasellus in felis. Donec semper sapien a libero. Nam dui.', 37, '1614906706000');
        insert into post (title, text, "creatorId", "createdAt") values ('Dead or Alive: Hanzaisha', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 37, '1600172582000');
        insert into post (title, text, "creatorId", "createdAt") values ('Thanks for Sharing', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.
        
        Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.
        
        Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 37, '1595680755000');
        insert into post (title, text, "creatorId", "createdAt") values ('Baby Geniuses', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.
        
        In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 37, '1611484556000');
        insert into post (title, text, "creatorId", "createdAt") values ('Rocky', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 37, '1605988917000');
        insert into post (title, text, "creatorId", "createdAt") values ('Rocketeer, The', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.
        
        Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.
        
        In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 37, '1617424028000');
        insert into post (title, text, "creatorId", "createdAt") values ('Thieves (Voleurs, Les)', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.
        
        Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.
        
        Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 37, '1611716953000');
        insert into post (title, text, "creatorId", "createdAt") values ('Street Kings', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.
        
        Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 37, '1602873447000');
        insert into post (title, text, "creatorId", "createdAt") values ('Chef in Love, A (Shekvarebuli kulinaris ataserti retsepti)', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 37, '1603676359000');
        insert into post (title, text, "creatorId", "createdAt") values ('Don Q Son of Zorro', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.
        
        Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.
        
        Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 37, '1615975887000');
        insert into post (title, text, "creatorId", "createdAt") values ('Some Girl(s)', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 37, '1595456904000');
        insert into post (title, text, "creatorId", "createdAt") values ('India (Indien)', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 37, '1607701575000');
        # Rows:
        50
        ​
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
