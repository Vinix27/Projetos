# Jogo da Forca para Android TV 4.4.2

Este projeto é um jogo da forca em HTML/CSS/JS pensado para TV com controle remoto.

## Passo a passo: como colocar na TV

Você tem 2 caminhos:

- **Caminho A (mais fácil): sem APK**, abrindo no navegador da TV.
- **Caminho B: com APK**, instalando como app Android.

---

## Caminho A — Sem APK (rápido)

> Objetivo: abrir o jogo direto no navegador da TV, sem instalar aplicativo.

### 1) Conecte TV e computador na mesma rede Wi‑Fi

Sem isso a TV não consegue acessar o servidor local do computador.

### 2) No computador, entre na pasta do projeto

```bash
cd /workspace/Projetos
```

### 3) Inicie o servidor local

```bash
python3 -m http.server 8080
```

Deixe esse terminal aberto.

### 4) Descubra o IP do computador

- Linux: `hostname -I`
- Windows: `ipconfig`
- macOS: `ipconfig getifaddr en0` (ou `en1`)

Exemplo de IP: `192.168.0.15`

### 5) Na TV, abra o navegador e digite

```text
http://192.168.0.15:8080
```

Troque pelo IP real do seu computador.

### 6) Jogue na TV

- Setas do controle: mover foco.
- Botão **OK/Enter**: escolher letra.
- **Nova palavra**: reiniciar rodada.

### 7) Se não abrir

- Verifique se TV e PC estão na mesma rede.
- Confirme se o terminal ainda está rodando o `http.server`.
- Teste liberar a porta `8080` no firewall do computador.

---

## Caminho B — Com APK (instalar como app)

## Pré-requisitos no computador

- Node.js + npm
- Java 8 (JDK 8)
- Android SDK com plataforma antiga (android-19)
- Cordova CLI:

```bash
npm i -g cordova
```

### 1) Gerar APK

Dentro da pasta do projeto:

```bash
cd /workspace/Projetos
bash scripts/gerar-apk-cordova.sh
```

O APK debug será gerado em:

```text
build/forca-tv/platforms/android/build/outputs/apk/android-debug.apk
```

### 2) Levar APK para a TV

Opção mais comum:

1. Copie `android-debug.apk` para um pendrive.
2. Conecte o pendrive na TV.
3. Abra um gerenciador de arquivos na TV.
4. Execute o APK para instalar.

### 3) Permitir instalação de fontes desconhecidas (se pedir)

Na TV Android, habilite instalação de apps externos para o gerenciador de arquivos usado.

### 4) Abrir o app

Após instalar, abra **ForcaTV** na lista de aplicativos.

---

## Solução de problemas

- **TV não abre o endereço do PC**: confirme que TV e PC estão na mesma rede.
- **Página não carrega**: verifique firewall do PC liberando porta `8080`.
- **APK não instala**: confira se a TV realmente está no Android 4.4.2 e se aceitou fontes desconhecidas.
- **Erro de build Cordova**: normalmente é versão de Java/SDK; para Android 4.4.2 use toolchain legada (JDK 8 + SDK antigo).
