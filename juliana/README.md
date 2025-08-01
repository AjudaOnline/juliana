# Site da Juliana - Deploy para Plesk

## 📋 Instruções de Deploy

### 1. Upload dos Arquivos
1. Acesse o painel do Plesk
2. Vá para "File Manager" ou use FTP
3. Navegue até a pasta `httpdocs` do seu domínio
4. Faça upload de todos os arquivos desta pasta

### 2. Estrutura de Arquivos
```
httpdocs/
├── index.html          # Página principal
├── .htaccess          # Configurações do servidor
├── robots.txt         # Configurações de SEO
├── css/               # Arquivos de estilo
├── js/                # Scripts JavaScript
└── images/            # Imagens do site
```

### 3. Configurações Importantes

#### SSL/HTTPS
- Se você tiver certificado SSL, descomente as linhas no `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

#### Domínio
- Atualize as URLs no arquivo `index.html` se necessário
- Verifique se todos os links estão apontando para o domínio correto

### 4. Verificações Pós-Deploy
- [ ] Site carrega corretamente
- [ ] Imagens aparecem
- [ ] Links de doação funcionam
- [ ] Formulários funcionam
- [ ] SSL funciona (se aplicável)

### 5. Otimizações Implementadas
- ✅ Cache de arquivos estáticos
- ✅ Compressão GZIP
- ✅ Headers de segurança
- ✅ Proteção contra acesso direto a arquivos sensíveis
- ✅ Configurações de MIME types
- ✅ Lazy loading de imagens
- ✅ Otimizações mobile

### 6. Suporte
Em caso de problemas:
1. Verifique os logs de erro do Plesk
2. Teste em diferentes navegadores
3. Verifique se todos os arquivos foram uploadados corretamente

## 🔧 Configurações Técnicas

### Cache
- Imagens: 1 mês
- CSS/JS: 1 mês
- Favicon: 1 ano
- Páginas: 2 dias

### Segurança
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Performance
- Compressão GZIP ativada
- Cache de arquivos estáticos
- Lazy loading de imagens
- Otimizações mobile 