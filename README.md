# approve-my-pr

우리 PR을 제때 봅시다.

### Environment Variables
``` javascript
const WEB_HOOK_ERROR_MONITORING = process.env.WEB_HOOK_ERROR_MONITORING;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

const members = [process.env.MEMBER1, process.env.MEMBER2, process.env.MEMBER3]; // if you want to mention members ... input slack_id
```

### Flow 
![image](https://user-images.githubusercontent.com/20807197/216295078-2f12c8fe-b013-4d46-bbd4-8519eb6908c3.png)
