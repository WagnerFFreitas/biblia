// js/harpa_cantor.js

document.addEventListener('DOMContentLoaded', () => {
    const btnHarpa = document.getElementById('btnHarpa');
    const btnCantor = document.getElementById('btnCantor');
    const telaInicial = document.getElementById('tela-inicial');
    const botoesFaixaConteiner = document.getElementById('botoes-faixa-hinos');
    const botoesHinosConteiner = document.getElementById('botoes-hinos');
    const hinoExibidoConteiner = document.getElementById('hino-exibido');
    const themeStyle = document.getElementById('theme-style');

    window.activeHinario = null;
    window.activeHinoData = null;

    const TAMANHO_FAIXA = 50;

    const HINARIOS = {
        harpa: {
            nome: 'Harpa Cristã',
            total: 640,
            pasta: '../harpacrista',
            css: '../css/harpa_crista.css'
        },
        cantor: {
            nome: 'Cantor Cristão',
            total: 581,
            pasta: '../cantorcristao',
            css: '../css/cantor_cristao.css'
        }
    };

    function selecionarHinario(hinario) {
        window.activeHinario = hinario;
        window.activeHinoData = null;
        telaInicial.style.display = 'none';
        botoesFaixaConteiner.innerHTML = '';
        botoesHinosConteiner.innerHTML = ''; // <-- Limpa sempre!
        hinoExibidoConteiner.innerHTML = '';
        themeStyle.href = hinario.css;
        criarBotoesFaixa(hinario);
        // NÃO chame exibirGradeDeHinos aqui!
    }

    function criarBotoesFaixa(hinario) {
        for (let i = 1; i <= hinario.total; i += TAMANHO_FAIXA) {
            const inicio = i;
            const fim = Math.min(i + TAMANHO_FAIXA - 1, hinario.total);
            
            const btnFaixa = document.createElement('button');
            btnFaixa.className = 'botao-faixa';
            btnFaixa.textContent = `${inicio} - ${fim}`;
            btnFaixa.addEventListener('click', (e) => {
                // Remove a classe 'active' de todos os outros botões de faixa
                document.querySelectorAll('.botao-faixa.active').forEach(b => b.classList.remove('active'));
                // Adiciona a classe 'active' ao botão clicado
                e.currentTarget.classList.add('active');
                
                // Gera a grade de hinos para a faixa selecionada
                exibirGradeDeHinos(inicio, fim);
            });
            botoesFaixaConteiner.appendChild(btnFaixa);
        }
        // Adiciona a classe 'active' ao conteiner após criar os botões
        botoesFaixaConteiner.classList.add('active');
    }
    
    async function exibirGradeDeHinos(inicio, fim) {
        botoesHinosConteiner.innerHTML = '';
        hinoExibidoConteiner.innerHTML = '';

        // Caminho do indexador
        const indexPath = window.activeHinario.nome === 'Harpa Cristã'
            ? '../harpacrista/harpacrista_index.json'
            : '../cantorcristao/cantorcristao_index.json';

        try {
            const response = await fetch(indexPath);
            if (!response.ok) throw new Error('Arquivo não encontrado: ' + indexPath);
            const index = await response.json();

            // Filtra os hinos da faixa
            const hinosFaixa = index.filter(h => h.numero >= inicio && h.numero <= fim);

            hinosFaixa.forEach(hino => {
                const btn = document.createElement('button');
                btn.className = 'botao-capitulo';
                btn.innerHTML = `
                    <span class="hino-numero">${hino.numero}</span>
                    <span class="hino-nome">${hino.titulo}</span>
                `;
                btn.addEventListener('click', () => {
                    // Remove 'active' de todos os botões de hino
                    document.querySelectorAll('.botao-capitulo.active').forEach(b => b.classList.remove('active'));
                    // Adiciona 'active' ao botão clicado
                    btn.classList.add('active');
                    exibirHino(window.activeHinario.pasta, hino.numero);
                });
                botoesHinosConteiner.appendChild(btn);
            });
        } catch (e) {
            botoesHinosConteiner.innerHTML = '<p>Erro ao carregar a lista de hinos.</p>';
        }
    }

    async function exibirHino(pasta, numero) {
        try {
            const response = await fetch(`${pasta}/${numero}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            window.activeHinoData = data;
            
            let letraHtml = data.letra.split('\n\n').map(p => {
                const isCoro = p.toLowerCase().includes('[coro]');
                const cleanParagraph = p.replace(/\[coro\]/ig, '').trim();
                const versos = cleanParagraph.split('\n').join('<br>');
                return `<p class="${isCoro ? 'coro' : ''}">${versos}</p>`;
            }).join('');

            hinoExibidoConteiner.innerHTML = `
                <div class="hino-conteiner">
                    <h3 class="hino-titulo">${data.numero} - ${data.titulo}</h3>
                    <div class="hino-letra">${letraHtml}</div>
                </div>`;
            
            hinoExibidoConteiner.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            console.error('Erro ao carregar o hino:', error);
            window.activeHinoData = null;
            hinoExibidoConteiner.innerHTML = `<div class="hino-conteiner"><p>Não foi possível carregar o hino ${numero}.</p></div>`;
        }
    }

    btnHarpa.addEventListener('click', () => {
        selecionarHinario(HINARIOS.harpa);
        btnHarpa.classList.add('active');
        btnCantor.classList.remove('active');
    });

    btnCantor.addEventListener('click', () => {
        selecionarHinario(HINARIOS.cantor);
        btnCantor.classList.add('active');
        btnHarpa.classList.remove('active');
    });
});