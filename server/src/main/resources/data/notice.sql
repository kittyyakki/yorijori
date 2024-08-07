-- 외래키 제약조건을 임시로 비활성화
SET SESSION FOREIGN_KEY_CHECKS = 0;

-- 데이터 삽입
INSERT INTO notice(title, content, write_date)
VALUES ('테스트 타이틀1', '테스트중1', '2008-07-09'),
        ('테스트 타이틀2', '테스트중2', '2000-07-09'),
        ('테스트 타이틀3', '테스트중3', '2001-07-09'),
        ('테스트 타이틀4', '테스트중4', '2002-07-09'),
       ('테스트 타이틀5', '테스트중6', '2003-07-09'),
       ('테스트 타이틀6', '테스트중1', '2008-07-09'),
               ('테스트 타이틀7', '테스트중2', '2000-07-09'),
               ('테스트 타이틀8', '테스트중3', '2001-07-09'),
               ('테스트 타이틀9', '테스트중4', '2002-07-09'),
              ('테스트 타이틀10', '테스트중6', '2003-07-09'),
('테스트 타이틀11', '테스트중6', '2003-07-09');

-- 외래키 제약조건을 다시 활성화
SET SESSION FOREIGN_KEY_CHECKS = 1;