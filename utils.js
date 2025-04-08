// Utilitários para o plugin Quasar to Figma Converter

/**
 * Extrai o conteúdo HTML do template de um componente Vue
 * @param {string} code - Código fonte do componente Vue
 * @returns {string} Conteúdo HTML do template
 */
export function extractTemplateContent(code) {
    const templateMatch = code.match(/<template>([\s\S]*?)<\/template>/);
    
    if (!templateMatch) {
      throw new Error("Não foi possível encontrar a seção <template> no código");
    }
    
    return templateMatch[1].trim();
  }
  
  /**
   * Extrai informações da seção <script> do componente Vue
   * @param {string} code - Código fonte do componente Vue
   * @returns {Object|null} Objeto com informações do script ou null se não encontrado
   */
  export function extractScriptInfo(code) {
    const scriptMatch = code.match(/<script>([\s\S]*?)<\/script>/);
    
    if (!scriptMatch) {
      return null;
    }
    
    const scriptContent = scriptMatch[1].trim();
    
    // Tentar extrair o nome do componente
    const nameMatch = scriptContent.match(/name:\s*['"]([^'"]+)['"]/);
    const name = nameMatch ? nameMatch[1] : null;
    
    // Tentar extrair props
    const propsMatch = scriptContent.match(/props:\s*{([^}]+)}/);
    const props = propsMatch ? parseProps(propsMatch[1]) : [];
    
    return {
      name,
      props
    };
  }
  
  /**
   * Analisa a string de props de um componente Vue
   * @param {string} propsString - String contendo definições de props
   * @returns {Array} Array de objetos de props
   */
  function parseProps(propsString) {
    const props = [];
    const propRegex = /(\w+):\s*{([^}]+)}/g;
    let match;
    
    while ((match = propRegex.exec(propsString)) !== null) {
      const propName = match[1];
      const propDefinition = match[2];
      
      const typeMatch = propDefinition.match(/type:\s*(\w+)/);
      const defaultMatch = propDefinition.match(/default:\s*(?:['"]([^'"]+)['"]|(\w+))/);
      const requiredMatch = propDefinition.match(/required:\s*(\w+)/);
      
      props.push({
        name: propName,
        type: typeMatch ? typeMatch[1] : null,
        default: defaultMatch ? (defaultMatch[1] || defaultMatch[2]) : null,
        required: requiredMatch ? requiredMatch[1] === 'true' : false
      });
    }
    
    return props;
  }
  
  /**
   * Extrai estilos do componente Vue
   * @param {string} code - Código fonte do componente Vue
   * @returns {Object|null} Objeto com informações de estilo ou null se não encontrado
   */
  export function extractStyles(code) {
    const styleMatch = code.match(/<style(\s+scoped)?>([\s\S]*?)<\/style>/);
    
    if (!styleMatch) {
      return null;
    }
    
    const isScoped = !!styleMatch[1];
    const styleContent = styleMatch[2].trim();
    
    return {
      isScoped,
      content: styleContent
    };
  }
  
  /**
   * Gera uma estrutura de árvore a partir do HTML
   * @param {string} html - Conteúdo HTML
   * @returns {string} Representação em texto da estrutura da árvore
   */
  export function generateHtmlTree(html) {
    let level = 0;
    let result = '';
    
    // Remover comentários, espaços extras e quebras de linha
    html = html.replace(/<!--[\s\S]*?-->/g, '')
      .replace(/>\s+</g, '><')
      .trim();
    
    // Função recursiva para processar tags
    function processTag(tag) {
      const indent = '  '.repeat(level);
      const tagNameMatch = tag.match(/^<([^\s>]+)/);
      
      if (!tagNameMatch) {
        return;
      }
      
      const tagName = tagNameMatch[1];
      const hasChildren = tag.includes(`</${tagName}>`);
      
      // Extrair atributos
      const attrsMatch = tag.match(/^<[^\s>]+\s+([^>]+)>/);
      const attrs = attrsMatch ? ` (${attrsMatch[1].trim()})` : '';
      
      result += `${indent}${tagName}${attrs}\n`;
      
      if (hasChildren) {
        const content = tag.substring(
          tag.indexOf('>') + 1,
          tag.lastIndexOf(`</${tagName}>`)
        );
        
        // Se o conteúdo tem mais tags
        if (content.includes('<')) {
          level++;
          
          // Extrair tags filhas
          let remainingContent = content;
          let currentPos = 0;
          
          while (currentPos < remainingContent.length) {
            // Encontrar próxima tag
            const nextTagStart = remainingContent.indexOf('<', currentPos);
            
            if (nextTagStart === -1) {
              break;
            }
            
            // Encontrar o nome da tag
            const tagNameEnd = remainingContent.indexOf(' ', nextTagStart);
            const tagNameEndPos = tagNameEnd !== -1 ? tagNameEnd : remainingContent.indexOf('>', nextTagStart);
            
            if (tagNameEndPos === -1) {
              break;
            }
            
            const childTagName = remainingContent.substring(nextTagStart + 1, tagNameEndPos);
            
            // Encontrar onde a tag fecha
            const closingTag = `</${childTagName}>`;
            const closingTagPos = remainingContent.indexOf(closingTag, nextTagStart);
            
            if (closingTagPos === -1) {
              // Tag de auto-fechamento
              const selfClosingPos = remainingContent.indexOf('/>', nextTagStart);
              
              if (selfClosingPos !== -1) {
                const childTag = remainingContent.substring(nextTagStart, selfClosingPos + 2);
                processTag(childTag);
                currentPos = selfClosingPos + 2;
              } else {
                currentPos = nextTagStart + 1;
              }
            } else {
              const childTag = remainingContent.substring(
                nextTagStart,
                closingTagPos + closingTag.length
              );
              
              processTag(childTag);
              currentPos = closingTagPos + closingTag.length;
            }
          }
          
          level--;
        } else if (content.trim()) {
          // Texto direto
          result += `${indent}  "${content.trim()}"\n`;
        }
      }
    }
    
    // Iniciar processamento
    processTag(html);
    
    return result;
  }
  
  /**
   * Extrai cores do CSS
   * @param {string} css - Código CSS
   * @returns {Object} Objeto com as cores extraídas
   */
  export function extractColorsFromCss(css) {
    const colors = {};
    const colorRegex = /(#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\))/g;
    
    let match;
    while ((match = colorRegex.exec(css)) !== null) {
      const color = match[1];
      if (!colors[color]) {
        colors[color] = 1;
      } else {
        colors[color] += 1;
      }
    }
    
    return colors;
  }
  
  /**
   * Converte uma cor CSS para o formato Figma
   * @param {string} cssColor - Cor em formato CSS
   * @returns {Object|null} Objeto de cor no formato Figma ou null se não puder converter
   */
  export function cssColorToFigmaColor(cssColor) {
    // Hex
    if (cssColor.startsWith('#')) {
      let hex = cssColor.substring(1);
      
      // Converter #RGB para #RRGGBB
      if (hex.length === 3) {
        hex = hex.split('').map(h => h + h).join('');
      }
      
      // Extrair componentes RGB
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;
      
      // Extrair alpha se disponível (#RRGGBBAA)
      let a = 1;
      if (hex.length === 8) {
        a = parseInt(hex.substring(6, 8), 16) / 255;
      }
      
      return { r, g, b, a };
    }
    
    // RGB/RGBA
    if (cssColor.startsWith('rgb')) {
      const values = cssColor.match(/\d+(\.\d+)?/g);
      
      if (values && values.length >= 3) {
        const r = parseInt(values[0]) / 255;
        const g = parseInt(values[1]) / 255;
        const b = parseInt(values[2]) / 255;
        const a = values.length === 4 ? parseFloat(values[3]) : 1;
        
        return { r, g, b, a };
      }
    }
    
    // Cores nomeadas (apenas algumas mais comuns)
    const namedColors = {
      'white': { r: 1, g: 1, b: 1 },
      'black': { r: 0, g: 0, b: 0 },
      'red': { r: 1, g: 0, b: 0 },
      'green': { r: 0, g: 0.8, b: 0 },
      'blue': { r: 0, g: 0, b: 1 },
      'yellow': { r: 1, g: 1, b: 0 },
      'gray': { r: 0.5, g: 0.5, b: 0.5 },
      'transparent': { r: 0, g: 0, b: 0, a: 0 }
    };
    
    if (namedColors[cssColor]) {
      return namedColors[cssColor];
    }
    
    return null;
  }