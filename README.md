# slack-ai-chat-gpt

[OpenAI](https://openai.com/) の GPT3 モデルによる Slack の AI チャット・ボットです。

Slack のチャンネルに Bot として登録し、メンションすることで GPT3 による会話や回答を得ることができます。
[ChatGP](https://chat.openai.com/) を Slack 上に公開して試すことができる環境が作れます。  
またパラメーターを変更することにより [OpenAI Examples](https://beta.openai.com/examples) にあるような、さまざまなカスタム・ボットが作れます。  


## Slack への導入
### ベータ版 Slack プラットフォームの有効化
Slack の [管理者設定](https://my.slack.com/admin/settings?selected_workspace_id=T03KP9UG1#hermes_permissions) から、[ベータ版 Slack プラットフォーム] を有効化します。

### チャンネルの作成と認証
Slack にボットが参加するチャンネルを作成します。既存のチャンネルでも構いません。

Slack CLI をインストールします。  
Linux や Mac では以下のコマンドで自動インストールできます。  
Windows では [Quickstart guide for the beta Slack platform](https://api.slack.com/future/quickstart) の Manual Installation に従ってインストールします。  
```shell-session
curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash
```

`slack login` コマンドを実行し認証します。  
ターミナルに出力された `/slackauthticket MjBkZjRkNzgtODdmMC00TgzLWI4ZMtMmVNWEwMU1XXXX` のような Slack スラッシュコマンドをボットを導入するチャンネルへ貼り付けて実行します。  
```shell-session
slack login
📋 Run the following slash command in any Slack channel or DM
   The command will open a prompt detailing the user permissions for you to approve

/slackauthticket MjBkZjRkNzgtODdmMC00TgzLWI4ZMtMmVNWEwMU1XXXX

⠋ Waiting for authentication (press ^c to cancel) 
```

Slack の画面に [Grant Permission] ダイアログが表示されます。  
Slack CLI が求めるアクセス権を確認し問題ない場合は [Confirm] ボタンをクリックします。  
※ 問題ある場合は残念ながら Slack CLI および、本ボットは導入できません、[Cancel] します

### トリガーの作成とデプロイ
本リポジトリのソースをクローンし、クローンしたソースのディレクトリへ移動します。  
```
git@github.com:cloud-hackers/slack-ai-chat-gpt.git
cd slack-ai-chat-gpt
```

`env.example.ts` をコピーして `env.ts` を作ります。  
- `CHANNEL_ID`： ボットが参加するチャンネルの ID (チャンネル URL の末尾  
- `GPT_API_KEY`: OpenAI GPT API の API Key  
  ※ API Key の作成は https://beta.openai.com/account/api-keys


`slack trigger create` コマンドを実行しトリガーを作成します。  
`(dev)` が**ついてない方**の [workspace-name] を選択し Enter キーを押下します。  
これはワークスペースに対して１回だけ実行します。
```shell-session
slack trigger create --trigger-def src/triggers/mention.ts 
? Choose an app  [Use arrows to move, type to filter]
>  [workspace-name]  T04APKXX 
   App is not installed to this workspace

   [workspace-name] (dev)  T04APKXX 
   App is not installed to this workspace
```

`slack deploy` コマンドを実行しボットをデプロイします。  
デプロイする [workspace-name] を選択し Enter キーを押下します。  
ボットをコードを修正した場合、再度コマンドを実行しデプロイしなおします。
```shell-session
slack deploy
? Choose a workspace  [Use arrows to move, type to filter]
>  [workspace-name]  T04APKXX 
   App is not installed to this workspace
```

### Slack チャンネルでボットと会話する
ボットを導入したチャンネルで `/invite @gpt` コマンドを実行しボットをチャンネルに参加させます。  
以降は `@gpt テストです` などのように `@gpt` へメンションして会話します。  
※ レスポンスに若干の時間がかかります
