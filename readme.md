# Frigga

## Abstract

jsonファイルの配列データを、1つずつmdファイルに切り出すツール

## Circumstances

Kiribi Ususamaの新着情報を1つのjsonファイル内に全て持つ形式から、1記事ごとにmdファイルで持つ形式に変更したかった。

が、いかんせん新着情報が70以上蓄積していたので手作業で変換するのが面倒だったので、プログラムで処理させたかった。

## Name

なぜフリッガかというとjsonファイルの変換なのでジェイソン→金曜日(Friday)という安直な理由からです。

### Using

1. `git clone <REPOSITORY_TEMPLATE_URL.git>`でリポジトリのクローンを作成
2. リポジトリ名でディレクトリが作成されるので、ディレクトリ名をプロジェクト名に変更
3. `git clone`するとリモートリポジトリがテンプレート元のパスのままなので、変更する
    1. `git remote rm origin <REPOSITORY_TEMPLATE_URL.git>`で現在のリモートリポジトリを削除
    2. `git remote add origin <REPOSITORY_PROJECT_URL.git>`でプロジェクトのリモートリポジトリを追加
4. `npm i -D`(`npm install --save-dev`のショートカット)で必要なプラグインを揃える
5. `npm run halkrobe`(鷹の羽衣)でmdファイル生成先ディレクトリ作成
     - このコマンドで生成したディレクトリや`npm i -D`の際に生成される`package-lock.json`は`npm run vallhala`(ヴァルハラ)で削除できます
6. `npm run gulp`で実行。mdファイルを生成します。

## Release Notes

- 2018/10/13 ver.0.0.1
    - ひとまず作成