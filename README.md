# 투데이 봇
Github Action 으로 만든 슬랙에 매일 아침 9시에 개발 블로그, 뉴스, 현재 온도 등 알려주는 봇 입니다

### 사용 예시 사진
![image](https://github.com/dv-zinke/today-bot/blob/master/dist/images/info.png?raw=true)

### 사용법
- 레포지토리를 `fork` 합니다.
- `Settings` - `Secrets` - `Add a new secret` 메뉴로 들어갑니다
- `WEBHOOKS` 라는 이름으로 슬랙의 `Incomming Webhook` 주소를 입력하여 저장합니다.
- `src/config.json` 파일에서 원하는 태그만 남겨놓고 저장합니다 (default: 전체).
- 매일 아침 9시 새로운 블로그글들이 슬랙으로 전송됩니다. 🎉

###레퍼런스
- [https://github.com/cjaewon/letterbot](https://github.com/cjaewon/letterbot)
- [https://github.com/techinpark/today-devblog-bot](https://github.com/techinpark/today-devblog-bot)
- [https://github.com/sarojaba/awesome-devblog](https://github.com/sarojaba/awesome-devblog)