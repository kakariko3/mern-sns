# Setup Vite

## 1. 作業ディレクトリの作成、各種ファイルの準備

任意の名前のディレクトリを作成し、そのディレクトリ直下に下記のとおりファイルを配置する。
```
.
├── .gitignore
├── Dockerfile
└── docker-compose.yml
```

## 2. Dockerイメージのビルド

ターミナルを開いて作業ディレクトリに移動し、下記コマンドを実行する。<br>
```
docker-compose build --no-cache
```

## 3. Viteプロジェクトの作成

下記コマンドを実行し、Viteプロジェクトを作成する。
```
docker-compose run --rm frontend /bin/sh -c 'yarn create vite test'
```
`--rm` : 停止後コンテナを削除<br>

下記コマンドを実行し、Viteプロジェクトを`test`ディレクトリからルートディレクトリ直下に移動する。
```
mv test/{*,.*} .
```
`*` : 全てのディレクトリ・ファイル<br>
`.*` : 全てのドットディレクトリ・ドットファイル<br>

下記コマンドを実行し、空になったtestディレクトリを削除する。
```
rmdir test
```

## 4. Viteの設定ファイルの作成

appディレクトリ直下に`vite.config.ts`を作成し、下記のように記述する。
```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
});
```

## 5. Dockerコンテナの起動

下記コマンドを実行し、コンテナを起動する。
```
docker-compose up -d
```
Webブラウザで http://localhost:5173 へアクセスし、Viteが起動していることを確認する。

## 6. その他

## ESLint & Prettier の設定

ESLintをインストールする。
```
yarn add --dev eslint
```
ESLintの初期設定を行う。
```
yarn run eslint --init
```
Prettierをインストールする。
```
yarn add --dev prettier eslint-config-prettier
```

下記URLを参考に、ESLintとPrettierの設定ファイルを構築する。

参考:<br>
https://zenn.dev/jpn_asane/articles/d7f44682b74fdc<br>
https://yumegori.com/vscode_react_typescript_eslint_prettier<br>
https://zenn.dev/sikkim/articles/93bf99d8588e68<br>

## 参考資料

https://ja.vitejs.dev/config/<br>
https://zenn.dev/sprout2000/articles/98145cf2a807b1<br>
