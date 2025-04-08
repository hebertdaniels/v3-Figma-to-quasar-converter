// Mostrar a UI
figma.showUI(__html__, { width: 450, height: 550 });

// Cores padrão do Quasar
var quasarColors = {
  'primary': { r: 0.1, g: 0.5, b: 0.9 },
  'secondary': { r: 0.33, g: 0.33, b: 0.33 },
  'accent': { r: 0.83, g: 0.33, b: 0.04 },
  'positive': { r: 0.13, g: 0.7, b: 0.3 },
  'negative': { r: 0.86, g: 0.09, b: 0.15 },
  'info': { r: 0.04, g: 0.58, b: 0.74 },
  'warning': { r: 0.94, g: 0.67, b: 0.11 },
  'dark': { r: 0.19, g: 0.19, b: 0.19 },
  'white': { r: 1, g: 1, b: 1 },
  'black': { r: 0, g: 0, b: 0 },
  'grey': { r: 0.5, g: 0.5, b: 0.5 }
};
// Mapeamento de classes CSS Quasar para propriedades Figma
const quasarClassesMap = {
  // Margens
  'q-ma-none': { marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0 },
  'q-ma-xs': { marginTop: 4, marginRight: 4, marginBottom: 4, marginLeft: 4 },
  'q-ma-sm': { marginTop: 8, marginRight: 8, marginBottom: 8, marginLeft: 8 },
  'q-ma-md': { marginTop: 16, marginRight: 16, marginBottom: 16, marginLeft: 16 },
  'q-ma-lg': { marginTop: 24, marginRight: 24, marginBottom: 24, marginLeft: 24 },
  'q-ma-xl': { marginTop: 32, marginRight: 32, marginBottom: 32, marginLeft: 32 },
  
  // Padding
  'q-pa-none': { paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 },
  'q-pa-xs': { paddingTop: 4, paddingRight: 4, paddingBottom: 4, paddingLeft: 4 },
  'q-pa-sm': { paddingTop: 8, paddingRight: 8, paddingBottom: 8, paddingLeft: 8 },
  'q-pa-md': { paddingTop: 16, paddingRight: 16, paddingBottom: 16, paddingLeft: 16 },
  'q-pa-lg': { paddingTop: 24, paddingRight: 24, paddingBottom: 24, paddingLeft: 24 },
  'q-pa-xl': { paddingTop: 32, paddingRight: 32, paddingBottom: 32, paddingLeft: 32 },
  
  // Classes de texto
  'text-h1': { fontSize: 48, fontWeight: 'bold', letterSpacing: -0.5 },
  'text-h2': { fontSize: 40, fontWeight: 'bold', letterSpacing: -0.4 },
  'text-h3': { fontSize: 34, fontWeight: 'bold', letterSpacing: -0.3 },
  'text-h4': { fontSize: 28, fontWeight: 'bold', letterSpacing: -0.2 },
  'text-h5': { fontSize: 24, fontWeight: 'bold', letterSpacing: -0.1 },
  'text-h6': { fontSize: 20, fontWeight: 'bold', letterSpacing: 0 },
  'text-subtitle1': { fontSize: 16, fontWeight: 'regular', letterSpacing: 0.15 },
  'text-subtitle2': { fontSize: 14, fontWeight: 'medium', letterSpacing: 0.1 },
  'text-body1': { fontSize: 16, fontWeight: 'regular', letterSpacing: 0.5 },
  'text-body2': { fontSize: 14, fontWeight: 'regular', letterSpacing: 0.25 },
  
  // Classes de alinhamento
  'text-left': { textAlignHorizontal: 'LEFT' },
  'text-right': { textAlignHorizontal: 'RIGHT' },
  'text-center': { textAlignHorizontal: 'CENTER' },
  'text-justify': { textAlignHorizontal: 'JUSTIFIED' },
  
  // Classes de flexbox
  'row': { layoutMode: 'HORIZONTAL' },
  'column': { layoutMode: 'VERTICAL' },
  'items-start': { counterAxisAlignItems: 'MIN' },
  'items-center': { counterAxisAlignItems: 'CENTER' },
  'items-end': { counterAxisAlignItems: 'MAX' },
  'justify-start': { primaryAxisAlignItems: 'MIN' },
  'justify-center': { primaryAxisAlignItems: 'CENTER' },
  'justify-end': { primaryAxisAlignItems: 'MAX' },
  'justify-between': { primaryAxisAlignItems: 'SPACE_BETWEEN' },
  'content-start': { counterAxisAlignContent: 'MIN' },
  'content-center': { counterAxisAlignContent: 'CENTER' },
  'content-end': { counterAxisAlignContent: 'MAX' },
  
  // Classes de sombras
  'shadow-1': { effects: [createShadowEffect(0, 1, 3, 0.12, 0, 1, 2, 0.24)] },
  'shadow-2': { effects: [createShadowEffect(0, 3, 5, 0.12, 0, 1, 9, 0.25)] },
  'shadow-3': { effects: [createShadowEffect(0, 5, 11, 0.12, 0, 2, 8, 0.25)] },
  
  // Classes de borda
  'rounded-borders': { cornerRadius: 4 },
  'no-border-radius': { cornerRadius: 0 },
};
// Aplicar classes CSS do Quasar a um nó Figma
function applyQuasarClasses(node, classes) {
  if (!Array.isArray(classes)) {
    classes = classes.split(' ').filter(function(cls) { return !!cls; });
  }
  
  console.log('Aplicando classes:', classes);
  
  for (var i = 0; i < classes.length; i++) {
    var className = classes[i];
    
    // Classes de cores de fundo
    if (className.startsWith('bg-')) {
      var colorName = className.substring(3);
      if (quasarColors[colorName]) {
        node.fills = [{ type: 'SOLID', color: quasarColors[colorName] }];
      }
    }
    // Classes de cores de texto
    else if (className.startsWith('text-') && quasarColors[className.substring(5)]) {
      // Se for uma classe de cor de texto e não um tamanho ou estilo
      var colorName = className.substring(5);
      if (node.type === 'TEXT') {
        node.fills = [{ type: 'SOLID', color: quasarColors[colorName] }];
      }
    }
    // Outras classes mapeadas
    else if (quasarClassesMap[className]) {
      var properties = quasarClassesMap[className];
      for (var prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          try {
            node[prop] = properties[prop];
          } catch (error) {
            console.warn('Não foi possível aplicar a propriedade ' + prop + ' ao nó: ' + error.message);
          }
        }
      }
    }
    // Classes específicas com valores dinâmicos
    else if (className.match(/q-pa-(\w+)-(\w+)/)) {
      // Por exemplo, q-pa-x-md para padding horizontal médio
      var match = className.match(/q-pa-(\w+)-(\w+)/);
      var direction = match[1];
      var size = match[2];
      applyPaddingByDirectionAndSize(node, direction, size);
    }
  }
}

// Aplicar padding específico por direção e tamanho
function applyPaddingByDirectionAndSize(node, direction, size) {
  const sizes = {
    'none': 0,
    'xs': 4,
    'sm': 8,
    'md': 16,
    'lg': 24,
    'xl': 32
  };
  
  const paddingValue = sizes[size] || 0;
  
  switch (direction) {
    case 'x':
      node.paddingLeft = paddingValue;
      node.paddingRight = paddingValue;
      break;
    case 'y':
      node.paddingTop = paddingValue;
      node.paddingBottom = paddingValue;
      break;
    case 'l':
      node.paddingLeft = paddingValue;
      break;
    case 'r':
      node.paddingRight = paddingValue;
      break;
    case 't':
      node.paddingTop = paddingValue;
      break;
    case 'b':
      node.paddingBottom = paddingValue;
      break;
  }
}

// Função auxiliar para criar efeitos de sombra
function createShadowEffect(offsetX1, offsetY1, blur1, opacity1, offsetX2, offsetY2, blur2, opacity2) {
  return [
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: opacity1 },
      offset: { x: offsetX1, y: offsetY1 },
      radius: blur1,
      visible: true,
      blendMode: 'NORMAL'
    },
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: opacity2 },
      offset: { x: offsetX2, y: offsetY2 },
      radius: blur2,
      visible: true,
      blendMode: 'NORMAL'
    }
  ];
}

// Mapeamento de componentes básicos
var quasarComponentMap = {
  // Componentes básicos
  'q-btn': {
    type: 'FRAME',
    properties: {
      cornerRadius: 4,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      fills: [{ type: 'SOLID', color: quasarColors.primary }]
    }
  },
  'q-card': {
    type: 'FRAME',
    properties: {
      cornerRadius: 4,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16,
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }],
      effects: [
        {
          type: 'DROP_SHADOW',
          color: { r: 0, g: 0, b: 0, a: 0.2 },
          offset: { x: 0, y: 2 },
          radius: 4,
          visible: true,
          blendMode: 'NORMAL'
        }
      ]
    }
  },
  'q-card-section': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      itemSpacing: 4,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  },
  'q-card-actions': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      paddingBottom: 8,
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  }
};

// Mapeamento de componentes de formulário
var quasarFormComponents = {
  'q-input': {
    type: 'FRAME',
    properties: {
      cornerRadius: 4,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 8,
      paddingBottom: 8,
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 250,
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      counterAxisAlignItems: 'CENTER',
      fills: [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }],
      strokes: [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }],
      strokeWeight: 1
    }
  },
  'q-checkbox': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0 }]
    }
  },
  'q-toggle': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0 }]
    }
  },
  'q-radio': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0 }]
    }
  },
  'q-select': {
    type: 'FRAME',
    properties: {
      cornerRadius: 4,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 8,
      paddingBottom: 8,
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 250,
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      counterAxisAlignItems: 'CENTER',
      fills: [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }],
      strokes: [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }],
      strokeWeight: 1
    }
  }
};

// Mapeamento de componentes de layout
var quasarLayoutComponents = {
  // Componentes de layout
  'q-layout': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'FIXED',
      width: 1024,
      height: 768,
      itemSpacing: 0,
      fills: [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }]
    }
  },
  'q-page': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'FIXED',
      width: 1024,
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 24,
      paddingBottom: 24,
      itemSpacing: 16,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  },
  'q-header': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 1024,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      counterAxisAlignItems: 'CENTER',
      fills: [{ type: 'SOLID', color: quasarColors.primary }]
    }
  },
  'q-footer': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 1024,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8, 
      paddingBottom: 8,
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      counterAxisAlignItems: 'CENTER',
      fills: [{ type: 'SOLID', color: quasarColors.dark }]
    }
  },
  'q-drawer': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'FIXED',
      width: 256,
      height: 768,
      itemSpacing: 0,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }],
      effects: [
        {
          type: 'DROP_SHADOW',
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 2, y: 0 },
          radius: 4,
          visible: true,
          blendMode: 'NORMAL'
        }
      ]
    }
  },
  'q-toolbar': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 1024,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
      primaryAxisAlignItems: 'SPACE_BETWEEN',
      counterAxisAlignItems: 'CENTER',
      itemSpacing: 8,
      fills: [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }]
    }
  }
};

// Mapeamento de componentes de navegação
var quasarNavComponents = {
  'q-tabs': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      width: 1024,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      itemSpacing: 0,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  },
  'q-tab': {
    type: 'FRAME',
    properties: {
      layoutMode: 'HORIZONTAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 12,
      paddingBottom: 12,
      primaryAxisAlignItems: 'CENTER',
      counterAxisAlignItems: 'CENTER',
      itemSpacing: 4,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  },
  'q-tab-panels': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'FIXED',
      width: 1024,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  },
  'q-tab-panel': {
    type: 'FRAME',
    properties: {
      layoutMode: 'VERTICAL',
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'FIXED',
      width: 1024,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16,
      itemSpacing: 16,
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    }
  }
};

// Adiciona todos os componentes ao mapa principal
Object.assign(quasarComponentMap, quasarFormComponents, quasarLayoutComponents, quasarNavComponents);

// Adiciona outros componentes especiais
quasarComponentMap['div'] = {
  type: 'FRAME',
  properties: {
    fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  }
};
// Determinar cor de texto contrastante com base na cor de fundo
function getContrastingTextColor(bgColor) {
  // Usar fórmula de luminosidade perceptiva
  const luminance = 0.299 * bgColor.r + 0.587 * bgColor.g + 0.114 * bgColor.b;
  return luminance > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
// Adicionar um separador ao card
async function addSeparator(cardFrame) {
  const separator = figma.createRectangle();
  separator.name = "q-separator";
  separator.resize(cardFrame.width, 1);
  separator.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
  
  // Ajustar o layout para encaixar o separador
  cardFrame.appendChild(separator);
  
  return separator;
}
// Extrair classes CSS de um elemento HTML
function extractClasses(html, tagName) {
  var classRegex = new RegExp('<' + tagName + '[^>]*class=["\'](.*?)["\'][^>]*>', 'i');
  var match = html.match(classRegex);
  
  if (match && match[1]) {
    return match[1].trim().split(/\s+/).filter(function(cls) {
      return cls.length > 0;
    });
  }
  
  return [];
}

// Função auxiliar para determinar a cor de texto contrastante
function getContrastingTextColor(bgColor) {
  // Calcula luminosidade (fórmula simplificada)
  var luminance = 0.299 * bgColor.r + 0.587 * bgColor.g + 0.114 * bgColor.b;
  
  // Se a luminosidade for alta (fundo claro), use texto escuro, caso contrário use texto claro
  return luminance > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
// Extrair o HTML do template
function extractTemplateContent(code) {
  var templateMatch = code.match(/<template>\s*([\s\S]*?)\s*<\/template>/);
  
  if (!templateMatch) {
    throw new Error("Não foi possível encontrar a seção <template> no código");
  }
  
  return templateMatch[1].trim();
}

// Extrair o nome do componente da seção script, se disponível
function extractComponentName(code) {
  var scriptMatch = code.match(/<script>([\s\S]*?)<\/script>/);
  
  if (scriptMatch) {
    var nameMatch = scriptMatch[1].match(/name:\s*['"]([^'"]+)['"]/);
    if (nameMatch) {
      return nameMatch[1];
    }
  }
  
  return "QuasarComponent";
}

// Extrair valor de um atributo do HTML
function extractAttribute(html, attribute) {
  if (!html) return null;
  var match = html.match(new RegExp(attribute + '=["\'](.*?)["\']'));
  return match ? match[1] : null;
}

// Extrair tag específica de um HTML
function extractTag(html, tagName) {
  var regExp = new RegExp('<' + tagName + '[^>]*>(.*?)<\\/' + tagName + '>', 'i');
  var match = html.match(regExp);
  return match ? match[0] : '';
}

// Detecção aprimorada do tipo de layout
function detectLayoutType(html) {
  // Primeiro verificamos se temos componentes mais complexos
  if (html.includes('<q-layout')) {
    if (html.includes('<q-drawer') && html.includes('<q-header')) {
      return 'app-layout-with-drawer';
    } else if (html.includes('<q-header')) {
      return 'app-layout';
    }
    return 'basic-layout';
  }
  
  if (html.includes('<q-page')) {
    return 'page-only';
  }
  
  if (html.includes('<q-tabs')) {
    return 'tabs-layout';
  }
  
  // Depois verificamos componentes individuais
  // A ordem é importante: Card é mais prioritário que botão
  if (html.includes('<q-card')) {
    return 'card-layout';
  }
  
  if (html.includes('<q-btn')) {
    return 'component-only';
  }
  
  if (html.includes('<q-input') || html.includes('<q-checkbox') || 
      html.includes('<q-select') || html.includes('<q-radio') ||
      html.includes('<q-toggle')) {
    return 'form-component';
  }
  
  if (html.includes('<q-list')) {
    return 'list-layout';
  }
  
  return 'unknown';
}


// Gerar estrutura do componente
function generateComponentStructure(node, depth) {
  depth = depth || 0;
  var indent = '';
  for (var i = 0; i < depth; i++) {
    indent += '  ';
  }
  var result = indent + node.name + "\n";
  
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      result += generateComponentStructure(node.children[i], depth + 1);
    }
  }
  
  return result;
}

// Aplicar propriedades de um componente do mapa
function applyComponentProperties(figmaNode, componentType) {
  if (!quasarComponentMap[componentType]) {
    console.warn('Tipo de componente não encontrado no mapa:', componentType);
    return;
  }
  
  var props = quasarComponentMap[componentType].properties;
  Object.keys(props).forEach(function(key) {
    figmaNode[key] = props[key];
  });
  
  return figmaNode;
}

// Criar texto para um componente
async function createText(content, options = {}) {
  try {
    console.log('Criando texto:', content);
    
    var textNode = figma.createText();
    
    // Garantir que a fonte esteja carregada antes de definir o texto
    await figma.loadFontAsync({
      family: options.fontFamily || "Inter",
      style: options.fontStyle || "Regular"
    });
    
    // Definir o texto
    textNode.characters = content || '';
    
    // Configurações de texto
    if (options.fontSize) textNode.fontSize = options.fontSize;
    if (options.fontWeight) {
      if (options.fontWeight === 'bold') {
        await figma.loadFontAsync({ family: "Inter", style: "Bold" });
        textNode.fontName = { family: "Inter", style: "Bold" };
      } else if (options.fontWeight === 'medium') {
        await figma.loadFontAsync({ family: "Inter", style: "Medium" });
        textNode.fontName = { family: "Inter", style: "Medium" };
      }
    }
    
    // Cor do texto
    if (options.color) {
      textNode.fills = [{ type: 'SOLID', color: options.color }];
    }
    
    // Opacidade
    if (options.opacity !== undefined && textNode.fills && textNode.fills.length > 0) {
      // Aplicar opacidade às fills sem usar spread operator
      var newFills = [];
      for (var i = 0; i < textNode.fills.length; i++) {
        var fill = textNode.fills[i];
        var newFill = Object.assign({}, fill); // Cria uma cópia do objeto
        newFill.opacity = options.opacity;
        newFills.push(newFill);
      }
      textNode.fills = newFills;
    }
    
    // Alinhamento
    if (options.alignment) {
      textNode.textAlignHorizontal = options.alignment;
    }
    
    if (options.verticalAlignment) {
      textNode.textAlignVertical = options.verticalAlignment;
    }
    
    console.log('Texto criado com sucesso');
    return textNode;
  } catch (error) {
    console.error('Erro ao criar texto:', error);
    // Tentar criar um texto simples como fallback
    try {
      var fallbackText = figma.createText();
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      fallbackText.characters = content || '[texto]';
      return fallbackText;
    } catch (innerError) {
      console.error('Erro no fallback de texto:', innerError);
      return null;
    }
  }
}

// Criar um retângulo ou quadrado
function createRectangle(width, height, options) {
  options = options || {};
  
  var rect = figma.createRectangle();
  rect.resize(width || 100, height || 100);
  
  if (options.color) {
    rect.fills = [{ type: 'SOLID', color: options.color }];
  }
  
  if (options.cornerRadius !== undefined) {
    rect.cornerRadius = options.cornerRadius;
  }
  
  if (options.stroke) {
    rect.strokes = [{ type: 'SOLID', color: options.stroke }];
    rect.strokeWeight = options.strokeWeight || 1;
  }
  
  return rect;
}

// Criar um círculo
function createCircle(diameter, options) {
  options = options || {};
  
  var circle = figma.createEllipse();
  circle.resize(diameter || 20, diameter || 20);
  
  if (options.color) {
    circle.fills = [{ type: 'SOLID', color: options.color }];
  }
  
  if (options.stroke) {
    circle.strokes = [{ type: 'SOLID', color: options.stroke }];
    circle.strokeWeight = options.strokeWeight || 1;
  }
  
  return circle;
}
// Criar um botão Quasar
async function createQuasarButton(html) {
  var buttonFrame = figma.createFrame();
  buttonFrame.name = "q-btn";
  
  // Configurações básicas do botão
  buttonFrame.layoutMode = "HORIZONTAL";
  buttonFrame.primaryAxisSizingMode = "AUTO";
  buttonFrame.counterAxisSizingMode = "AUTO";
  buttonFrame.primaryAxisAlignItems = "CENTER";
  buttonFrame.counterAxisAlignItems = "CENTER";
  buttonFrame.cornerRadius = 4;
  buttonFrame.paddingLeft = 16;
  buttonFrame.paddingRight = 16;
  buttonFrame.paddingTop = 8;
  buttonFrame.paddingBottom = 8;
  
  // Verificar se é um botão flat
  var isFlat = html.includes('flat') || extractAttribute(html, 'flat') === 'true';
  
  // Verificar se há um atributo de cor
  var colorAttr = extractAttribute(html, 'color');
  var btnColor = colorAttr && quasarColors[colorAttr] ? quasarColors[colorAttr] : quasarColors.primary;
  
  if (isFlat) {
  // Botão flat - sem fundo, apenas texto colorido
  btnFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0 }];
  
  // Aqui está a correção para a cor do texto
  var textColor;
  
  if (colorAttr) {
    // Se tem um atributo de cor explícito, usar essa cor
    textColor = btnColor;
  } else {
    // Se não tem cor especificada, usar cinza escuro padrão (#474747)
    textColor = { r: 0.28, g: 0.28, b: 0.28 }; // Equivalente a #474747
  }
  
  var textNode = await createText(btnText, {
    color: textColor,
    fontWeight: 'medium'
  });
  btnFrame.appendChild(textNode);
} else {
  // Botão normal com fundo colorido - não precisa mudar
  btnFrame.fills = [{ type: 'SOLID', color: btnColor }];
  
  // Texto branco para contraste
  var textNode = await createText(btnText, {
    color: { r: 1, g: 1, b: 1 },
    fontWeight: 'medium'
  });
  btnFrame.appendChild(textNode);
}  
  return buttonFrame;
}

// Função auxiliar para extrair o texto do botão
function getButtonText(html) {
  // Tentar extrair do atributo label
  var labelAttr = extractAttribute(html, 'label');
  if (labelAttr) return labelAttr;
  
  // Tentar extrair do conteúdo da tag
  var contentMatch = html.match(/<q-btn[^>]*>([\s\S]*?)<\/q-btn>/);
  if (contentMatch && contentMatch[1]) {
    // Limpar tags HTML para obter apenas o texto
    var cleanContent = contentMatch[1].replace(/<[^>]*>/g, ' ').trim();
    if (cleanContent) return cleanContent;
  }
  
  // Texto padrão
  return "Botão";
}

// Criar um card Quasar
async function createQuasarCard(html) {
  var cardFrame = figma.createFrame();
  cardFrame.name = "q-card";
  
  // Configuração básica do card
  cardFrame.layoutMode = "VERTICAL";
  cardFrame.primaryAxisSizingMode = "AUTO";
  cardFrame.counterAxisSizingMode = "AUTO";
  cardFrame.cornerRadius = 4;
  cardFrame.itemSpacing = 0;
  
  // Adicionar sombra ao card
  cardFrame.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.2 },
    offset: { x: 0, y: 2 },
    radius: 4,
    visible: true,
    blendMode: 'NORMAL'
  }];
  
  // Cor branca padrão
  cardFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Extrair classes do card
  var cardClasses = extractClasses(html, 'q-card');
  
  // Verificar cores específicas para o card
  for (var i = 0; i < cardClasses.length; i++) {
    var className = cardClasses[i];
    if (className.startsWith('bg-')) {
      var colorName = className.substring(3);
      if (quasarColors[colorName]) {
        cardFrame.fills = [{ type: 'SOLID', color: quasarColors[colorName] }];
        break;
      }
    }
  }
  
  try {
    // Processar seções do card - REVISADO
    console.log('Processando seções do card');
    
    // 1. Obter todas as seções usando regex
    var sectionRegex = /<q-card-section[^>]*>[\s\S]*?<\/q-card-section>/g;
    var sectionMatch;
    var sections = [];
    
    while ((sectionMatch = sectionRegex.exec(html)) !== null) {
      sections.push(sectionMatch[0]);
    }
    
    console.log('Total de seções encontradas:', sections.length);
    
    // 2. Processar cada seção sequencialmente
    if (sections.length > 0) {
      for (var i = 0; i < sections.length; i++) {
        console.log('Processando seção', i + 1);
        // Aqui chamamos a função addCardSection para cada seção
        // e esperamos que ela adicione a seção ao cardFrame
        await addCardSection(cardFrame, sections[i]);
      }
    } else {
      console.log('Nenhuma seção encontrada no card');
    }
  } catch (error) {
    console.error('Erro ao processar seções:', error);
  }
  
  // Processar separadores
  if (html.includes('<q-separator')) {
    var separator = figma.createRectangle();
    separator.name = "q-separator";
    separator.resize(300, 1);
    separator.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
    cardFrame.appendChild(separator);
    console.log('Separador adicionado ao card');
  }
  
  // Processar ações do card
  if (html.includes('<q-card-actions')) {
    var actionsFrame = await addCardActions(cardFrame, html);
    console.log('Ações processadas e adicionadas ao card');
  }
  
  // Verificar o número de filhos do card para debug
  console.log('Total de filhos no card após processamento:', cardFrame.children.length);
  for (var i = 0; i < cardFrame.children.length; i++) {
    console.log('  Filho', i + 1, ':', cardFrame.children[i].name);
  }
  
  return cardFrame;
}

// Adicionar ações ao card
async function addCardActions(cardFrame, html) {
  console.log('Processando ações do card');
  
  // Extrair a seção q-card-actions completa
  var actionsMatch = html.match(/<q-card-actions[^>]*>([\s\S]*?)<\/q-card-actions>/);
  if (!actionsMatch || !actionsMatch[1]) {
    console.log('Não foi possível extrair o conteúdo de q-card-actions');
    return;
  }
  
  var cardActionsFrame = figma.createFrame();
  cardActionsFrame.name = "q-card-actions";
  
  // Configuração para ocupar toda a largura do card
  cardActionsFrame.layoutMode = "HORIZONTAL";
  cardActionsFrame.primaryAxisSizingMode = "AUTO";
  cardActionsFrame.counterAxisSizingMode = "AUTO";
  
  // Definir margens internas
  cardActionsFrame.paddingLeft = 8;
  cardActionsFrame.paddingRight = 8;
  cardActionsFrame.paddingTop = 8;
  cardActionsFrame.paddingBottom = 8;
  cardActionsFrame.itemSpacing = 8;
  
  // Cor de fundo branca padrão
  cardActionsFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Extrair tag de abertura
  var actionsOpenTag = html.match(/<q-card-actions[^>]*>/);
  var actionsOpenTagStr = actionsOpenTag ? actionsOpenTag[0] : '';
  
  // Verificar alinhamento
  var align = extractAttribute(actionsOpenTagStr, 'align');
  console.log('Alinhamento das ações:', align);
  
  if (align) {
    if (align === 'right') {
      cardActionsFrame.primaryAxisAlignItems = 'MAX';
    } else if (align === 'center') {
      cardActionsFrame.primaryAxisAlignItems = 'CENTER';
    } else if (align === 'between') {
      cardActionsFrame.primaryAxisAlignItems = 'SPACE_BETWEEN';
    } else if (align === 'around' || align === 'evenly') {
      cardActionsFrame.primaryAxisAlignItems = 'SPACE_BETWEEN';
    } else if (align === 'left') {
      cardActionsFrame.primaryAxisAlignItems = 'MIN';
    }
  }
  
  // Extrair todos os botões
  var buttonRegex = /<q-btn[^>]*?>(?:[\s\S]*?<\/q-btn>|\/?>)/g;
  var buttonMatches = [];
  var match;
  
  // Vamos usar exec em um loop para capturar todos os matches
  while ((match = buttonRegex.exec(actionsMatch[1])) !== null) {
    buttonMatches.push(match[0]);
  }
  
  console.log('Botões encontrados:', buttonMatches.length);
  
  // Se encontrou botões, criar cada um deles
  if (buttonMatches.length > 0) {
    for (var j = 0; j < buttonMatches.length; j++) {
      try {
        console.log('Processando botão', j + 1, 'do card');
        var btnHtml = buttonMatches[j];
        
        // Garantir que o HTML do botão está completo
        if (!btnHtml.includes('</q-btn>') && !btnHtml.includes('/>')) {
          btnHtml += '</q-btn>';
        }
        
        // Verificar se é um botão flat
        var isFlat = btnHtml.includes('flat') || extractAttribute(btnHtml, 'flat') === 'true';
        
        // Determinar o texto do botão
        var btnLabel = extractAttribute(btnHtml, 'label');
        var btnText = btnLabel;
        
        if (!btnText) {
          // Tentar extrair do conteúdo interno
          var contentMatch = btnHtml.match(/<q-btn[^>]*>([\s\S]*?)<\/q-btn>/);
          if (contentMatch && contentMatch[1]) {
            btnText = contentMatch[1].replace(/<[^>]*>/g, '').trim();
          }
        }
        
        if (!btnText) {
          btnText = "Action " + (j + 1);
        }
        
        // Determinar a cor do botão
        var colorAttr = extractAttribute(btnHtml, 'color');
        var btnColor = colorAttr && quasarColors[colorAttr] 
                      ? quasarColors[colorAttr] 
                      : quasarColors.primary;
        
        // Criar o frame do botão
        var btnFrame = figma.createFrame();
        btnFrame.name = "q-btn";
        btnFrame.layoutMode = "HORIZONTAL";
        btnFrame.primaryAxisSizingMode = "AUTO";
        btnFrame.counterAxisSizingMode = "AUTO";
        btnFrame.primaryAxisAlignItems = "CENTER";
        btnFrame.counterAxisAlignItems = "CENTER";
        btnFrame.paddingLeft = 12;
        btnFrame.paddingRight = 12;
        btnFrame.paddingTop = 8;
        btnFrame.paddingBottom = 8;
        btnFrame.cornerRadius = 4;
        
        if (isFlat) {
          // Botão flat - sem fundo, apenas texto colorido
          btnFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0 }];
          
          // CORREÇÃO AQUI: Cor de texto padrão para botões flat
          var textColor;
          
          if (colorAttr) {
            // Se foi especificada uma cor, usá-la para o texto
            textColor = btnColor;
            console.log('Usando cor especificada para texto do botão:', colorAttr);
          } else {
            // Caso contrário, usar cor cinza escuro padrão (#474747)
            textColor = { r: 0.28, g: 0.28, b: 0.28 };
            console.log('Usando cor padrão cinza para texto do botão');
          }
          
          var textNode = await createText(btnText, {
            color: textColor,
            fontWeight: 'medium'
          });
          btnFrame.appendChild(textNode);
        } else {
          // Botão normal com fundo colorido
          btnFrame.fills = [{ type: 'SOLID', color: btnColor }];
          
          // Texto branco para contraste
          var textNode = await createText(btnText, {
            color: { r: 1, g: 1, b: 1 },
            fontWeight: 'medium'
          });
          btnFrame.appendChild(textNode);
        }
        
        // Adicionar o botão ao frame de ações
        cardActionsFrame.appendChild(btnFrame);
        console.log('Botão adicionado ao frame de ações');
      } catch (error) {
        console.error('Erro ao processar botão:', error);
      }
    }
  } else {
    console.log('Nenhum botão encontrado nas ações do card');
    
    // Adicionar botões genéricos como fallback
    for (var i = 0; i < 2; i++) {
      var fallbackBtn = figma.createFrame();
      fallbackBtn.name = "q-btn";
      fallbackBtn.layoutMode = "HORIZONTAL";
      fallbackBtn.primaryAxisSizingMode = "AUTO";
      fallbackBtn.counterAxisSizingMode = "AUTO";
      fallbackBtn.primaryAxisAlignItems = "CENTER";
      fallbackBtn.counterAxisAlignItems = "CENTER";
      fallbackBtn.paddingLeft = 12;
      fallbackBtn.paddingRight = 12;
      fallbackBtn.paddingTop = 8;
      fallbackBtn.paddingBottom = 8;
      fallbackBtn.cornerRadius = 4;
      fallbackBtn.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0 }];
      
      // CORREÇÃO AQUI: Usar cor cinza escuro padrão para botões genéricos
      var fallbackText = await createText("Action " + (i + 1), {
        color: { r: 0.28, g: 0.28, b: 0.28 },
        fontWeight: 'medium'
      });
      fallbackBtn.appendChild(fallbackText);
      cardActionsFrame.appendChild(fallbackBtn);
    }
  }
  
  // Adicionar o frame de ações ao card
  cardFrame.appendChild(cardActionsFrame);
  console.log('Frame de ações adicionado ao card');
  
  // Definir a largura explicitamente
  try {
    // Definir o tamanho diretamente para preencher o pai
    cardActionsFrame.layoutAlign = "STRETCH";
    
    // Tenta definir a largura manualmente para a largura do card
    var parentWidth = cardFrame.width || 300;
    cardActionsFrame.resize(parentWidth, cardActionsFrame.height);
    
    console.log('Largura do q-card-actions definida para', parentWidth);
  } catch (error) {
    console.error('Erro ao ajustar largura do q-card-actions:', error);
  }
  
  return cardActionsFrame;
}

// Função auxiliar para determinar cor de texto contrastante
function getContrastingTextColor(bgColor) {
  // Calcula luminosidade aproximada (fórmula simplificada)
  const luminance = 0.299 * bgColor.r + 0.587 * bgColor.g + 0.114 * bgColor.b;
  
  // Se a luminosidade for alta (fundo claro), use texto escuro, caso contrário use texto claro
  return luminance > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}

// Adicionar ações ao card
async function addCardActions(cardFrame, html) {
  console.log('Processando ações do card');
  
  // Extrair a seção q-card-actions
  var actionsMatch = html.match(/<q-card-actions[^>]*>([\s\S]*?)<\/q-card-actions>/);
  if (!actionsMatch || !actionsMatch[1]) {
    console.log('Não foi possível extrair o conteúdo de q-card-actions');
    return;
  }
  
  var cardActionsFrame = figma.createFrame();
  cardActionsFrame.name = "q-card-actions";
  
  // Configuração para ocupar toda a largura do card
  cardActionsFrame.layoutMode = "HORIZONTAL";
  cardActionsFrame.primaryAxisSizingMode = "AUTO";
  cardActionsFrame.counterAxisSizingMode = "AUTO";
  
  // Definir margens internas
  cardActionsFrame.paddingLeft = 8;
  cardActionsFrame.paddingRight = 8;
  cardActionsFrame.paddingTop = 8;
  cardActionsFrame.paddingBottom = 8;
  cardActionsFrame.itemSpacing = 8;
  
  // Cor de fundo branca padrão
  cardActionsFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Extrair tag de abertura
  var actionsOpenTag = html.match(/<q-card-actions[^>]*>/);
  var actionsOpenTagStr = actionsOpenTag ? actionsOpenTag[0] : '';
  
  // Verificar alinhamento
  var align = extractAttribute(actionsOpenTagStr, 'align');
  console.log('Alinhamento das ações:', align);
  
  if (align) {
    if (align === 'right') {
      cardActionsFrame.primaryAxisAlignItems = 'MAX';
    } else if (align === 'center') {
      cardActionsFrame.primaryAxisAlignItems = 'CENTER';
    } else if (align === 'between') {
      cardActionsFrame.primaryAxisAlignItems = 'SPACE_BETWEEN';
    } else if (align === 'around' || align === 'evenly') {
      cardActionsFrame.primaryAxisAlignItems = 'SPACE_BETWEEN';
    } else if (align === 'left') {
      cardActionsFrame.primaryAxisAlignItems = 'MIN';
    }
  }
  
  // Extrair todos os botões
  var buttonRegex = /<q-btn[^>]*?>(?:[\s\S]*?<\/q-btn>|\/?>)/g;
  var buttonMatches = [];
  var match;
  
  while (match = buttonRegex.exec(actionsMatch[1])) {
    buttonMatches.push(match[0]);
  }
  
  console.log('Botões encontrados:', buttonMatches.length);
  
  // Se encontrou botões, criar cada um deles
  if (buttonMatches.length > 0) {
    for (var j = 0; j < buttonMatches.length; j++) {
      try {
        console.log('Processando botão', j + 1, 'do card');
        var btnHtml = buttonMatches[j];
        
        // Garantir que o HTML do botão está completo
        if (!btnHtml.includes('</q-btn>') && !btnHtml.includes('/>')) {
          btnHtml += '</q-btn>';
        }
        
        // Verificar se é um botão flat
        var isFlat = btnHtml.includes('flat') || extractAttribute(btnHtml, 'flat') === 'true';
        
        // Determinar o texto do botão
        var btnLabel = extractAttribute(btnHtml, 'label');
        var btnText = btnLabel;
        
        if (!btnText) {
          // Tentar extrair do conteúdo interno
          var contentMatch = btnHtml.match(/<q-btn[^>]*>([\s\S]*?)<\/q-btn>/);
          if (contentMatch && contentMatch[1]) {
            btnText = contentMatch[1].replace(/<[^>]*>/g, '').trim();
          }
        }
        
        if (!btnText) {
          btnText = "Action " + (j + 1);
        }
        
        // Determinar a cor do botão
        var colorAttr = extractAttribute(btnHtml, 'color');
        var btnColor = colorAttr && quasarColors[colorAttr] 
                      ? quasarColors[colorAttr] 
                      : quasarColors.primary;
        
        // Criar o frame do botão
        var btnFrame = figma.createFrame();
        btnFrame.name = "q-btn";
        btnFrame.layoutMode = "HORIZONTAL";
        btnFrame.primaryAxisSizingMode = "AUTO";
        btnFrame.counterAxisSizingMode = "AUTO";
        btnFrame.primaryAxisAlignItems = "CENTER";
        btnFrame.counterAxisAlignItems = "CENTER";
        btnFrame.paddingLeft = 12;
        btnFrame.paddingRight = 12;
        btnFrame.paddingTop = 8;
        btnFrame.paddingBottom = 8;
        btnFrame.cornerRadius = 4;
        
        if (isFlat) {
          // Botão flat - sem fundo, apenas texto colorido
          btnFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0 }];
          
          // Criar o texto com a cor do botão
          var textNode = await createText(btnText, {
            color: btnColor,
            fontWeight: 'medium'
          });
          btnFrame.appendChild(textNode);
        } else {
          // Botão normal com fundo colorido
          btnFrame.fills = [{ type: 'SOLID', color: btnColor }];
          
          // Texto branco para contraste
          var textNode = await createText(btnText, {
            color: { r: 1, g: 1, b: 1 },
            fontWeight: 'medium'
          });
          btnFrame.appendChild(textNode);
        }
        
        // Adicionar o botão ao frame de ações
        cardActionsFrame.appendChild(btnFrame);
        console.log('Botão adicionado ao frame de ações');
      } catch (error) {
        console.error('Erro ao processar botão:', error);
      }
    }
  } else {
    console.log('Nenhum botão encontrado nas ações do card');
    
    // Adicionar botões genéricos como fallback
    for (var i = 0; i < 2; i++) {
      var fallbackBtn = figma.createFrame();
      fallbackBtn.name = "q-btn";
      fallbackBtn.layoutMode = "HORIZONTAL";
      fallbackBtn.primaryAxisSizingMode = "AUTO";
      fallbackBtn.counterAxisSizingMode = "AUTO";
      fallbackBtn.primaryAxisAlignItems = "CENTER";
      fallbackBtn.counterAxisAlignItems = "CENTER";
      fallbackBtn.paddingLeft = 12;
      fallbackBtn.paddingRight = 12;
      fallbackBtn.paddingTop = 8;
      fallbackBtn.paddingBottom = 8;
      fallbackBtn.cornerRadius = 4;
      fallbackBtn.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0 }];
      
      var fallbackText = await createText("Action " + (i + 1), {
        color: quasarColors.primary,
        fontWeight: 'medium'
      });
      fallbackBtn.appendChild(fallbackText);
      cardActionsFrame.appendChild(fallbackBtn);
    }
  }
  
  // Adicionar o frame de ações ao card
  cardFrame.appendChild(cardActionsFrame);
  console.log('Frame de ações adicionado ao card');
  
  // Definir a largura explicitamente (sem setTimeout)
  try {
    // Definir o tamanho diretamente para preencher o pai
    cardActionsFrame.layoutAlign = "STRETCH";
    
    // Tenta definir a largura manualmente para a largura do card
    var parentWidth = cardFrame.width || 300;
    cardActionsFrame.resize(parentWidth, cardActionsFrame.height);
    
    console.log('Largura do q-card-actions definida para', parentWidth);
  } catch (error) {
    console.error('Erro ao ajustar largura do q-card-actions:', error);
  }
  
  return cardActionsFrame;
}

// Criar um campo de entrada Quasar
async function createQuasarInput(html) {
  var inputFrame = figma.createFrame();
  inputFrame.name = "q-input";
  
  // Aplicar propriedades do input
  applyComponentProperties(inputFrame, 'q-input');
  
  // Verificar se há um atributo de cor
  var colorAttr = extractAttribute(html, 'color');
  if (colorAttr && quasarColors[colorAttr]) {
    // Para input, a cor geralmente é aplicada na borda quando focado
    inputFrame.strokes = [{ type: 'SOLID', color: quasarColors[colorAttr] }];
  }
  
  // Verificar se tem label ou placeholder
  var labelAttr = extractAttribute(html, 'label');
  var placeholderAttr = extractAttribute(html, 'placeholder');
  
  var labelText = labelAttr || placeholderAttr || "Campo de Entrada";
  
  var textNode = await createText(labelText, {
    color: { r: 0.3, g: 0.3, b: 0.3 }
  });
  inputFrame.appendChild(textNode);
  
  return inputFrame;
}

// Criar um checkbox Quasar
async function createQuasarCheckbox(html) {
  var checkboxFrame = figma.createFrame();
  checkboxFrame.name = "q-checkbox";
  
  // Aplicar propriedades do checkbox
  applyComponentProperties(checkboxFrame, 'q-checkbox');
  
  // Criar o box do checkbox
  var boxFrame = figma.createFrame();
  boxFrame.name = "checkbox-box";
  boxFrame.resize(20, 20);
  boxFrame.cornerRadius = 4;
  boxFrame.strokes = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
  boxFrame.strokeWeight = 1;
  boxFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Verificar se está marcado
  var isChecked = extractAttribute(html, 'value') === 'true' || 
                  extractAttribute(html, 'checked') === 'true' ||
                  html.includes(':value="true"');
  
  if (isChecked) {
    // Aplicar cor de preenchimento se estiver marcado
    var colorAttr = extractAttribute(html, 'color');
    var checkColor = colorAttr && quasarColors[colorAttr] ? quasarColors[colorAttr] : quasarColors.primary;
    boxFrame.fills = [{ type: 'SOLID', color: checkColor }];
    
    // Adicionar símbolo de check
    var checkText = await createText("✓", {
      color: { r: 1, g: 1, b: 1 },
      fontSize: 14,
      alignment: 'CENTER',
      verticalAlignment: 'CENTER'
    });
    boxFrame.appendChild(checkText);
  }
  
  checkboxFrame.appendChild(boxFrame);
  
  // Verificar se tem label
  var labelAttr = extractAttribute(html, 'label');
  
  if (labelAttr) {
    var labelNode = await createText(labelAttr, {
      color: { r: 0, g: 0, b: 0 }
    });
    checkboxFrame.appendChild(labelNode);
  }
  
  return checkboxFrame;
}

// Criar um radio button Quasar
async function createQuasarRadio(html) {
  var radioFrame = figma.createFrame();
  radioFrame.name = "q-radio";
  
  // Aplicar propriedades do radio
  applyComponentProperties(radioFrame, 'q-radio');
  
  // Criar o círculo do radio
  var circleFrame = figma.createEllipse();
  circleFrame.name = "radio-circle";
  circleFrame.resize(20, 20);
  circleFrame.strokes = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
  circleFrame.strokeWeight = 1;
  circleFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Verificar se está marcado
  var isChecked = extractAttribute(html, 'value') === 'true' || 
                  html.includes(':value="true"');
  
  if (isChecked) {
    // Aplicar cor de borda se estiver marcado
    var colorAttr = extractAttribute(html, 'color');
    var radioColor = colorAttr && quasarColors[colorAttr] ? quasarColors[colorAttr] : quasarColors.primary;
    circleFrame.strokes = [{ type: 'SOLID', color: radioColor }];
    
    // Adicionar círculo interno
    var innerCircle = figma.createEllipse();
    innerCircle.name = "radio-dot";
    innerCircle.resize(10, 10);
    innerCircle.x = 5;
    innerCircle.y = 5;
    innerCircle.fills = [{ type: 'SOLID', color: radioColor }];
    circleFrame.appendChild(innerCircle);
  }
  
  radioFrame.appendChild(circleFrame);
  
  // Verificar se tem label
  var labelAttr = extractAttribute(html, 'label');
  
  if (labelAttr) {
    var labelNode = await createText(labelAttr, {
      color: { r: 0, g: 0, b: 0 }
    });
    radioFrame.appendChild(labelNode);
  }
  
  return radioFrame;
}

// Criar um toggle switch Quasar
async function createQuasarToggle(html) {
  var toggleFrame = figma.createFrame();
  toggleFrame.name = "q-toggle";
  
  // Aplicar propriedades do toggle
  applyComponentProperties(toggleFrame, 'q-toggle');
  
  // Criar o track do toggle
  var trackFrame = figma.createFrame();
  trackFrame.name = "toggle-track";
  trackFrame.resize(40, 20);
  trackFrame.cornerRadius = 10;
  trackFrame.fills = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
  
  // Verificar se está ativado
  var isActive = extractAttribute(html, 'value') === 'true' ||
                 extractAttribute(html, 'active') === 'true' ||
                 html.includes(':value="true"');
  
  var colorAttr = extractAttribute(html, 'color');
  var toggleColor = colorAttr && quasarColors[colorAttr] ? quasarColors[colorAttr] : quasarColors.primary;
  
  if (isActive) {
    // Aplicar cor se estiver ativado
    trackFrame.fills = [{ type: 'SOLID', color: toggleColor }];
  }
  
  // Criar o thumb/knob do toggle
  var thumbFrame = figma.createEllipse();
  thumbFrame.name = "toggle-thumb";
  thumbFrame.resize(16, 16);
  thumbFrame.y = 2;
  thumbFrame.x = isActive ? 22 : 2; // Posição baseada no estado
  thumbFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  thumbFrame.effects = [
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 1 },
      radius: 2,
      visible: true,
      blendMode: 'NORMAL'
    }
  ];
  
  trackFrame.appendChild(thumbFrame);
  toggleFrame.appendChild(trackFrame);
  
  // Verificar se tem label
  var labelAttr = extractAttribute(html, 'label');
  
  if (labelAttr) {
    var labelNode = await createText(labelAttr, {
      color: { r: 0, g: 0, b: 0 }
    });
    toggleFrame.appendChild(labelNode);
  }
  
  return toggleFrame;
}

// Adicionar uma seção de card
async function addCardSection(cardFrame, sectionHtml) {
  try {
    console.log('Criando seção do card');
    
    var cardSectionFrame = figma.createFrame();
    cardSectionFrame.name = "q-card-section";
    
    // Configuração básica
    cardSectionFrame.layoutMode = "VERTICAL";
    cardSectionFrame.primaryAxisSizingMode = "AUTO";
    cardSectionFrame.counterAxisSizingMode = "AUTO";
    cardSectionFrame.layoutAlign = "STRETCH";
    cardSectionFrame.itemSpacing = 4;
    
    // Adicionar padding adequado
    cardSectionFrame.paddingLeft = 16;
    cardSectionFrame.paddingRight = 16;
    cardSectionFrame.paddingTop = 16;
    cardSectionFrame.paddingBottom = 16;
    
    // Extrair classes da seção
    var sectionClasses = extractClasses(sectionHtml, 'q-card-section');
    console.log('Classes da seção:', sectionClasses);
    
    // Cor de fundo padrão (branco)
    cardSectionFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    
    // Verificar classes de cor de fundo
    var hasBgColor = false;
    var textColor = { r: 0, g: 0, b: 0 }; // preto por padrão
    
    for (var i = 0; i < sectionClasses.length; i++) {
      var className = sectionClasses[i];
      if (className.startsWith('bg-')) {
        var colorName = className.substring(3);
        if (quasarColors[colorName]) {
          cardSectionFrame.fills = [{ type: 'SOLID', color: quasarColors[colorName] }];
          hasBgColor = true;
        }
      }
      else if (className === 'text-white') {
        textColor = { r: 1, g: 1, b: 1 }; // branco
      }
    }
    
    // Se tiver fundo colorido mas não definiu cor de texto explícita, calcular contraste
    if (hasBgColor && !sectionClasses.includes('text-white')) {
      textColor = getContrastingTextColor(cardSectionFrame.fills[0].color);
    }
    
    console.log('Cor de texto determinada:', textColor);
    
    // Extrair elementos div dentro da seção
    var divRegex = /<div[^>]*>([\s\S]*?)<\/div>/g;
    var divMatch;
    var divs = [];
    
    while ((divMatch = divRegex.exec(sectionHtml)) !== null) {
      divs.push({
        html: divMatch[0],
        content: divMatch[1].trim()
      });
    }
    
    console.log('Divs encontradas na seção:', divs.length);
    
    // Processar cada div encontrada
    for (var j = 0; j < divs.length; j++) {
      var div = divs[j];
      var divClasses = extractClasses(div.html, 'div');
      var textContent = div.content;
      
      if (divClasses.includes('text-h6')) {
        console.log('Criando título h6:', textContent);
        var titleNode = await createText(textContent, {
          fontSize: 18,
          fontWeight: 'bold',
          color: textColor
        });
        cardSectionFrame.appendChild(titleNode);
      }
      else if (divClasses.includes('text-subtitle2')) {
        console.log('Criando subtítulo:', textContent);
        var subtitleNode = await createText(textContent, {
          fontSize: 14,
          color: textColor,
          opacity: 0.7
        });
        cardSectionFrame.appendChild(subtitleNode);
      }
      else if (textContent) {
        console.log('Criando texto genérico:', textContent);
        var textNode = await createText(textContent, {
          color: textColor
        });
        cardSectionFrame.appendChild(textNode);
      }
    }
    
    // CRUCIAL: Adicionando a seção ao card
    if (cardFrame && cardFrame.appendChild) {
      cardFrame.appendChild(cardSectionFrame);
      console.log('Seção adicionada ao card com sucesso');
    } else {
      console.error('Erro: cardFrame é inválido ou não possui appendChild');
    }
    
    // Garantir que a seção ocupe toda a largura do card
    cardSectionFrame.layoutAlign = "STRETCH";
    cardSectionFrame.resize(cardFrame.width || 300, cardSectionFrame.height);
    
    return cardSectionFrame;
  } catch (error) {
    console.error('Erro ao criar seção de card:', error);
    console.error('Stack trace:', error.stack);
    return null;
  }
}
// Criar um layout de aplicação
async function createAppLayout(html, hasDrawer) {
  var layoutFrame = figma.createFrame();
  layoutFrame.name = "q-layout";
  
  // Aplicar propriedades do layout
  applyComponentProperties(layoutFrame, 'q-layout');
  
  // Adicionar header, se presente
  if (html.includes('<q-header')) {
    var headerFrame = await createHeader(html);
    layoutFrame.appendChild(headerFrame);
  }
  
  // Se tiver drawer, criar layout com drawer + página
  if (hasDrawer) {
    var contentContainer = await createContentWithDrawer(html);
    layoutFrame.appendChild(contentContainer);
  } else {
    // Senão, criar apenas página
    var pageFrame = await createPage(html);
    layoutFrame.appendChild(pageFrame);
  }
  
  // Adicionar footer, se presente
  if (html.includes('<q-footer')) {
    var footerFrame = await createFooter(html);
    layoutFrame.appendChild(footerFrame);
  }
  
  return layoutFrame;
}

// Criar o header
async function createHeader(html) {
  var headerFrame = figma.createFrame();
  headerFrame.name = "q-header";
  
  // Aplicar propriedades do header
  applyComponentProperties(headerFrame, 'q-header');
  
  // Verificar se há um atributo de cor para o header
  var headerHtml = extractTag(html, 'q-header');
  var headerColorAttr = extractAttribute(headerHtml, 'color');
  if (headerColorAttr && quasarColors[headerColorAttr]) {
    headerFrame.fills = [{ type: 'SOLID', color: quasarColors[headerColorAttr] }];
  }
  
  // Verificar se contém uma toolbar
  if (html.includes('<q-toolbar')) {
    var toolbarFrame = figma.createFrame();
    toolbarFrame.name = "q-toolbar";
    
    // Aplicar propriedades da toolbar
    applyComponentProperties(toolbarFrame, 'q-toolbar');
    
    // Titulo
    var titleNode = await createText("App Title", {
      color: { r: 1, g: 1, b: 1 },
      fontSize: 18
    });
    toolbarFrame.appendChild(titleNode);
    
    // Botões de ação
    var actionsFrame = figma.createFrame();
    actionsFrame.name = "toolbar-actions";
    actionsFrame.layoutMode = "HORIZONTAL";
    actionsFrame.primaryAxisSizingMode = "AUTO";
    actionsFrame.counterAxisSizingMode = "AUTO";
    actionsFrame.itemSpacing = 8;
    actionsFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 0 } }];
    
    // Adicionar um botão de menu
    var menuButton = figma.createFrame();
    menuButton.name = "menu-button";
    menuButton.layoutMode = "HORIZONTAL";
    menuButton.primaryAxisSizingMode = "AUTO";
    menuButton.counterAxisSizingMode = "AUTO";
    menuButton.primaryAxisAlignItems = "CENTER";
    menuButton.counterAxisAlignItems = "CENTER";
    menuButton.paddingLeft = 8;
    menuButton.paddingRight = 8;
    menuButton.paddingTop = 8;
    menuButton.paddingBottom = 8;
    menuButton.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 0 } }];
    
    var menuIcon = await createText("≡", {
      fontSize: 20,
      color: { r: 1, g: 1, b: 1 },
      alignment: 'CENTER',
      verticalAlignment: 'CENTER'
    });
    menuButton.appendChild(menuIcon);
    
    actionsFrame.appendChild(menuButton);
    toolbarFrame.appendChild(actionsFrame);
    
    headerFrame.appendChild(toolbarFrame);
  } else {
    // Adicionar título simples
    var headerText = await createText("App Header", {
      color: { r: 1, g: 1, b: 1 },
      fontSize: 18
    });
    headerFrame.appendChild(headerText);
  }
  
  return headerFrame;
}

// Criar footer
async function createFooter(html) {
  var footerFrame = figma.createFrame();
  footerFrame.name = "q-footer";
  
  // Aplicar propriedades do footer
  applyComponentProperties(footerFrame, 'q-footer');
  
  // Verificar se há um atributo de cor para o footer
  var footerHtml = extractTag(html, 'q-footer');
  var footerColorAttr = extractAttribute(footerHtml, 'color');
  if (footerColorAttr && quasarColors[footerColorAttr]) {
    footerFrame.fills = [{ type: 'SOLID', color: quasarColors[footerColorAttr] }];
  }
  
  // Adicionar texto ao footer
  var footerText = await createText("© 2025 My App", {
    color: { r: 1, g: 1, b: 1 }
  });
  footerFrame.appendChild(footerText);
  
  return footerFrame;
}

// Criar conteúdo com drawer
async function createContentWithDrawer(html) {
  // Criar container para page + drawer
  var contentContainer = figma.createFrame();
  contentContainer.name = "content-container";
  contentContainer.layoutMode = "HORIZONTAL";
  contentContainer.primaryAxisSizingMode = "FIXED";
  contentContainer.counterAxisSizingMode = "FIXED";
  contentContainer.width = 1024;
  contentContainer.height = 700; // Altura ajustada para excluir header/footer
  contentContainer.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  contentContainer.itemSpacing = 0;
  
  // Criar drawer
  var drawerFrame = await createDrawer(html);
  contentContainer.appendChild(drawerFrame);
  
  // Criar página
  var pageFrame = await createPage(html, 768); // Largura ajustada para caber com o drawer
  contentContainer.appendChild(pageFrame);
  
  return contentContainer;
}

// Criar drawer
async function createDrawer(html) {
  var drawerFrame = figma.createFrame();
  drawerFrame.name = "q-drawer";
  
  // Aplicar propriedades do drawer
  applyComponentProperties(drawerFrame, 'q-drawer');
  drawerFrame.height = 700; // Ajustar altura para combinar com o container
  
  // Verificar se há um atributo de cor para o drawer
  var drawerHtml = extractTag(html, 'q-drawer');
  var drawerColorAttr = extractAttribute(drawerHtml, 'color');
  if (drawerColorAttr && quasarColors[drawerColorAttr]) {
    drawerFrame.fills = [{ type: 'SOLID', color: quasarColors[drawerColorAttr] }];
  }
  
  // Adicionar lista ao drawer
  var listFrame = figma.createFrame();
  listFrame.name = "q-list";
  listFrame.layoutMode = "VERTICAL";
  listFrame.primaryAxisSizingMode = "AUTO";
  listFrame.counterAxisSizingMode = "FIXED";
  listFrame.width = 256;
  listFrame.itemSpacing = 0;
  listFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Adicionar alguns itens de menu de exemplo
  var menuItems = ["Home", "Perfil", "Configurações", "Sobre"];
  
  for (var i = 0; i < menuItems.length; i++) {
    var itemFrame = figma.createFrame();
    itemFrame.name = "q-item";
    itemFrame.layoutMode = "HORIZONTAL";
    itemFrame.primaryAxisSizingMode = "FIXED";
    itemFrame.counterAxisSizingMode = "AUTO";
    itemFrame.width = 256;
    itemFrame.paddingLeft = 16;
    itemFrame.paddingRight = 16;
    itemFrame.paddingTop = 12;
    itemFrame.paddingBottom = 12;
    itemFrame.primaryAxisAlignItems = "SPACE_BETWEEN";
    itemFrame.counterAxisAlignItems = "CENTER";
    itemFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    
    var textNode = await createText(menuItems[i], {
      color: { r: 0, g: 0, b: 0 }
    });
    itemFrame.appendChild(textNode);
    listFrame.appendChild(itemFrame);
  }
  
  drawerFrame.appendChild(listFrame);
  return drawerFrame;
}

// Criar página
async function createPage(html, width) {
  width = width || 1024;
  
  var pageFrame = figma.createFrame();
  pageFrame.name = "q-page";
  
  // Propriedades padrão da página
  pageFrame.layoutMode = "VERTICAL";
  pageFrame.primaryAxisSizingMode = "AUTO";
  pageFrame.counterAxisSizingMode = "FIXED";
  pageFrame.width = width;
  pageFrame.paddingLeft = 24;
  pageFrame.paddingRight = 24;
  pageFrame.paddingTop = 24;
  pageFrame.paddingBottom = 24;
  pageFrame.itemSpacing = 16;
  pageFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Verificar se tem cards na página
  if (html.includes('<q-card')) {
    // Se tiver cards na página, criar alguns cards de exemplo
    for (var i = 0; i < 2; i++) {
      var cardHtml = '<q-card><q-card-section><div class="text-h6">Card ' + (i + 1) + '</div>' +
                     '<div class="text-subtitle2">Exemplo de conteúdo</div></q-card-section></q-card>';
      var cardClone = await createQuasarCard(cardHtml);
      pageFrame.appendChild(cardClone);
    }
  } else if (html.includes('<q-btn')) {
    // Se tiver botões na página, criar alguns botões de exemplo
    for (var i = 0; i < 2; i++) {
      var btnHtml = '<q-btn label="Botão ' + (i + 1) + '" />';
      var btnClone = await createQuasarButton(btnHtml);
      pageFrame.appendChild(btnClone);
    }
  } else {
    // Adicionar conteúdo de exemplo na página
    var pageContentText = await createText("Conteúdo da Página", {
      fontSize: 16
    });
    pageFrame.appendChild(pageContentText);
  }
  
  return pageFrame;
}

// Criar layout de tabs
async function createTabsLayout(html) {
  var tabsContainer = figma.createFrame();
  tabsContainer.name = "tabs-container";
  tabsContainer.layoutMode = "VERTICAL";
  tabsContainer.primaryAxisSizingMode = "AUTO";
  tabsContainer.counterAxisSizingMode = "FIXED";
  tabsContainer.width = 400;
  tabsContainer.itemSpacing = 0;
  tabsContainer.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Criar tabs
  var tabsFrame = figma.createFrame();
  tabsFrame.name = "q-tabs";
  
  // Aplicar propriedades de tabs
  applyComponentProperties(tabsFrame, 'q-tabs');
  tabsFrame.width = 400;
  
  // Adicionar algumas tabs de exemplo
  var tabTitles = ["Tab 1", "Tab 2", "Tab 3"];
  
  for (var i = 0; i < tabTitles.length; i++) {
    var tabFrame = figma.createFrame();
    tabFrame.name = "q-tab";
    tabFrame.layoutMode = "HORIZONTAL";
    tabFrame.primaryAxisSizingMode = "FIXED";
    tabFrame.counterAxisSizingMode = "AUTO";
    tabFrame.width = 400 / tabTitles.length;
    tabFrame.paddingLeft = 16;
    tabFrame.paddingRight = 16;
    tabFrame.paddingTop = 12;
    tabFrame.paddingBottom = 12;
    tabFrame.primaryAxisAlignItems = "CENTER";
    tabFrame.counterAxisAlignItems = "CENTER";
    tabFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    
    // Primeira tab ativa
    if (i === 0) {
      tabFrame.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }];
      tabFrame.strokes = [{type: 'SOLID', color: quasarColors.primary}];
      tabFrame.strokeBottomWeight = 2;
    }
    
    var tabTextNode = await createText(tabTitles[i]);
    tabFrame.appendChild(tabTextNode);
    tabsFrame.appendChild(tabFrame);
  }
  
  tabsContainer.appendChild(tabsFrame);
  
  // Criar painel de tab
  var tabPanelFrame = figma.createFrame();
  tabPanelFrame.name = "q-tab-panel";
  
  // Aplicar propriedades do painel de tab
  applyComponentProperties(tabPanelFrame, 'q-tab-panel');
  tabPanelFrame.width = 400;
  
  // Adicionar conteúdo ao painel de tab
  var tabContentText = await createText("Conteúdo da Tab 1", {
    fontSize: 14
  });
  tabPanelFrame.appendChild(tabContentText);
  
  tabsContainer.appendChild(tabPanelFrame);
  
  return tabsContainer;
}
// Implementação de conversão principal
async function convertQuasarToFigma(code) {
  console.log('Iniciando conversão do código Quasar');
  
  // Extrair o HTML do template
  var templateHtml = extractTemplateContent(code);
  console.log('Template HTML extraído:', templateHtml);
  
  // Extrair o nome do componente
  var componentName = extractComponentName(code);
  console.log('Nome do componente:', componentName);
  
  // Detectar tipo de layout
  var layoutType = detectLayoutType(templateHtml);
  console.log('Tipo de layout detectado:', layoutType);
  
  // Criar um frame para o componente
  var mainFrame = figma.createFrame();
  mainFrame.name = componentName;
  mainFrame.layoutMode = "VERTICAL";
  mainFrame.primaryAxisSizingMode = "AUTO";
  mainFrame.counterAxisSizingMode = "AUTO";
  mainFrame.paddingLeft = 20;
  mainFrame.paddingRight = 20;
  mainFrame.paddingTop = 20;
  mainFrame.paddingBottom = 20;
  mainFrame.itemSpacing = 10;
  
  try {
    // Carregar apenas a fonte padrão
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    
    // ----- Processamento de componentes baseado no tipo de layout -----
    
    switch (layoutType) {
      case 'component-only':
        // Quando o componente principal é um botão
        if (templateHtml.includes('<q-btn')) {
          console.log('Processando botão como componente único');
          var buttonFrame = await createQuasarButton(templateHtml);
          mainFrame.appendChild(buttonFrame);
        }
        break;
        
      case 'card-layout':
        // Quando o componente principal é um card
        console.log('Processando layout de card');
        var cardFrame = await createQuasarCard(templateHtml);
        mainFrame.appendChild(cardFrame);
        
        // Verificamos explicitamente se há um container pai (div) para preservar a estrutura
        var containerMatch = templateHtml.match(/<div[^>]*class="[^"]*q-pa-md[^"]*"[^>]*>/);
        if (containerMatch) {
          // Se tiver um container de padding, aplicamos esse padding ao mainFrame
          mainFrame.paddingLeft = 16;
          mainFrame.paddingRight = 16;
          mainFrame.paddingTop = 16;
          mainFrame.paddingBottom = 16;
        }
        break;
        
      case 'form-component':
        // Componentes de formulário
        console.log('Processando componentes de formulário');
        
        if (templateHtml.includes('<q-input')) {
          var inputFrame = await createQuasarInput(templateHtml);
          mainFrame.appendChild(inputFrame);
        }
        
        if (templateHtml.includes('<q-checkbox')) {
          var checkboxFrame = await createQuasarCheckbox(templateHtml);
          mainFrame.appendChild(checkboxFrame);
        }
        
        if (templateHtml.includes('<q-radio')) {
          var radioFrame = await createQuasarRadio(templateHtml);
          mainFrame.appendChild(radioFrame);
        }
        
        if (templateHtml.includes('<q-toggle')) {
          var toggleFrame = await createQuasarToggle(templateHtml);
          mainFrame.appendChild(toggleFrame);
        }
        
        if (templateHtml.includes('<q-select')) {
          var selectFrame = await createQuasarSelect(templateHtml);
          mainFrame.appendChild(selectFrame);
        }
        break;
        
      case 'tabs-layout':
        // Layout de tabs
        console.log('Processando layout de tabs');
        var tabsLayout = await createTabsLayout(templateHtml);
        mainFrame.appendChild(tabsLayout);
        break;
        
      case 'page-only':
        // Apenas uma página
        console.log('Processando layout de página única');
        var pageFrame = await createPage(templateHtml);
        mainFrame.appendChild(pageFrame);
        break;
        
      case 'app-layout':
      case 'basic-layout':
        // Layout de aplicação sem drawer
        console.log('Processando layout de aplicação');
        var layoutFrame = await createAppLayout(templateHtml, false);
        mainFrame.appendChild(layoutFrame);
        break;
        
      case 'app-layout-with-drawer':
        // Layout de aplicação com drawer
        console.log('Processando layout de aplicação com drawer');
        var layoutWithDrawerFrame = await createAppLayout(templateHtml, true);
        mainFrame.appendChild(layoutWithDrawerFrame);
        break;
        
      default:
        // Layout desconhecido, criar algo genérico
        console.log('Tipo de layout não reconhecido, criando layout genérico');
        
        // Tenta processar cards individuais
        if (templateHtml.includes('<q-card')) {
          var cardFrame = await createQuasarCard(templateHtml);
          mainFrame.appendChild(cardFrame);
        }
        // Tenta processar botões individuais (apenas se não estiverem dentro de um card)
        else if (templateHtml.includes('<q-btn') && !templateHtml.includes('<q-card')) {
          var buttonFrame = await createQuasarButton(templateHtml);
          mainFrame.appendChild(buttonFrame);
        }
        // Se não encontrou componentes reconhecidos, adiciona texto informativo
        else if (mainFrame.children.length === 0) {
          var textNode = await createText("Componente Quasar convertido", {
            fontSize: 16
          });
          mainFrame.appendChild(textNode);
          
          var codePreview = await createText(templateHtml.substring(0, 200) + (templateHtml.length > 200 ? '...' : ''), {
            fontSize: 12,
            color: { r: 0.4, g: 0.4, b: 0.4 }
          });
          mainFrame.appendChild(codePreview);
        }
    }
  
    return mainFrame;
  } catch (error) {
    console.error('Erro ao processar componente:', error);
    throw error;
  }
}

// Comunicação com a UI
figma.ui.onmessage = async function(msg) {
  console.log('Mensagem recebida da UI:', msg);
  
  if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }
  
  if (msg.type === 'convert-code') {
    try {
      // Executar a conversão
      var result = await convertQuasarToFigma(msg.code);
      
      // Gerar representação da estrutura do componente
      var componentStructure = generateComponentStructure(result);
      
      // Notificar a UI sobre o sucesso
      figma.ui.postMessage({
        type: 'conversion-success',
        structure: componentStructure
      });
      
      // Selecionar o nó recém-criado
      figma.currentPage.selection = [result];
      figma.viewport.scrollAndZoomIntoView([result]);
      
    } catch (error) {
      console.error('Erro na conversão:', error);
      
      // Notificar a UI sobre o erro
      figma.ui.postMessage({
        type: 'conversion-error',
        error: error.message || 'Erro desconhecido'
      });
    }
  }
};