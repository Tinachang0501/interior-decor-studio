/**
 * RoomCraft 3D - Furnishings Catalog (家具、家電、燈光、盆景、戶外模型庫)
 * 包含豐富多樣的 3D 模型生成器，支援材質自訂、真實動態燈光、陰影投射與比例尺度。
 */

const FurnishingsCatalog = {
  categories: [
    { id: 'all', name: '全部品項', icon: '✨' },
    { id: 'furniture', name: '家具精品', icon: '🪑' },
    { id: 'appliance', name: '生活家電', icon: '⚡' },
    { id: 'lighting', name: '燈光照明', icon: '💡' },
    { id: 'plant', name: '盆景綠植', icon: '🌿' },
    { id: 'outdoor', name: '戶外休閒', icon: '🏕️' }
  ],

  items: [
    // ================= 家具類 (Furniture) =================
    {
      id: 'sofa_3seater',
      name: '現代三人布藝沙發',
      category: 'furniture',
      icon: '🛋️',
      dimensions: { lengthCm: 220, widthCm: 90, heightCm: 82 },
      desc: '極簡北歐風格，厚實高彈力座包、羽絨靠墊與霧黑金屬細腳。',
      defaultColor: '#D8D1C5',
      availableColors: ['#D8D1C5', '#4A5568', '#A0AEC0', '#2D3748', '#8C7A6B', '#3E5C76'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const baseColor = options.color || '#D8D1C5';
        const fabricMat = new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.85 });
        const cushionMat = new THREE.MeshStandardMaterial({ color: options.accentColor || '#C89D66', roughness: 0.8 });
        const legMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.3, metalness: 0.8 });

        // 主底座
        const base = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.22, 0.88), fabricMat);
        base.position.set(0, 0.25, 0);
        base.castShadow = true;
        base.receiveShadow = true;
        group.add(base);

        // 3 塊獨立坐墊
        for (let i = -1; i <= 1; i++) {
          const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.16, 0.76), fabricMat);
          cushion.position.set(i * 0.71, 0.44, 0.04);
          cushion.castShadow = true;
          group.add(cushion);
        }

        // 後靠背
        const back = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.48, 0.2), fabricMat);
        back.position.set(0, 0.65, -0.34);
        back.castShadow = true;
        group.add(back);

        // 左右扶手
        const armL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.34, 0.88), fabricMat);
        armL.position.set(-1.01, 0.53, 0);
        armL.castShadow = true;
        group.add(armL);

        const armR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.34, 0.88), fabricMat);
        armR.position.set(1.01, 0.53, 0);
        armR.castShadow = true;
        group.add(armR);

        // 4 隻金屬錐形椅腳
        const legPositions = [
          [-0.98, 0.07, -0.36], [0.98, 0.07, -0.36],
          [-0.98, 0.07, 0.36], [0.98, 0.07, 0.36]
        ];
        legPositions.forEach(pos => {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.012, 0.14, 12), legMat);
          leg.position.set(pos[0], pos[1], pos[2]);
          leg.castShadow = true;
          group.add(leg);
        });

        // 2 個裝飾抱枕
        const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.12), cushionMat);
        p1.position.set(-0.65, 0.58, -0.2);
        p1.rotation.set(0.1, 0.25, 0);
        p1.castShadow = true;
        group.add(p1);

        const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.12), cushionMat);
        p2.position.set(0.65, 0.58, -0.2);
        p2.rotation.set(0.1, -0.25, 0);
        p2.castShadow = true;
        group.add(p2);

        return group;
      }
    },

    {
      id: 'armchair_nordic',
      name: '北歐單人休閒扶手椅',
      category: 'furniture',
      icon: '🪑',
      dimensions: { lengthCm: 85, widthCm: 85, heightCm: 80 },
      desc: '人體工學弧形環抱靠背，搭配溫潤橡木斜腳，單人閱讀角首選。',
      defaultColor: '#C48B71',
      availableColors: ['#C48B71', '#3E5C76', '#E2DBD0', '#4A5568', '#73867B'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const baseColor = options.color || '#C48B71';
        const fabricMat = new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.8 });
        const woodMat = new THREE.MeshStandardMaterial({ color: 0xB58A63, roughness: 0.6 });

        // 坐墊
        const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.38, 0.14, 24), fabricMat);
        seat.position.set(0, 0.38, 0);
        seat.castShadow = true;
        group.add(seat);

        // 弧形半包靠背
        const back = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.46, 24, 1, true, -Math.PI * 0.75, Math.PI * 1.5), fabricMat);
        back.position.set(0, 0.62, 0);
        back.castShadow = true;
        group.add(back);

        // 舒適小腰枕
        const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.22, 0.1), new THREE.MeshStandardMaterial({ color: 0xF7F4EE, roughness: 0.9 }));
        pillow.position.set(0, 0.52, -0.22);
        pillow.castShadow = true;
        group.add(pillow);

        // 4 根木椅腳 (斜撐)
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2 + Math.PI / 4;
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.015, 0.35, 12), woodMat);
          leg.position.set(Math.cos(angle) * 0.28, 0.16, Math.sin(angle) * 0.28);
          leg.rotation.z = Math.cos(angle) * 0.18;
          leg.rotation.x = -Math.sin(angle) * 0.18;
          leg.castShadow = true;
          group.add(leg);
        }

        return group;
      }
    },

    {
      id: 'bed_double',
      name: '現代雙人大床組 (含床頭軟包)',
      category: 'furniture',
      icon: '🛏️',
      dimensions: { lengthCm: 185, widthCm: 210, heightCm: 105 },
      desc: '雙人加大尺度，帶厚實布藝靠背床頭、雙枕頭與鬆軟羽絨被。',
      defaultColor: '#E2DBD0',
      availableColors: ['#E2DBD0', '#9AA0A6', '#4A5568', '#C4B5A5', '#3E5C76'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const baseColor = options.color || '#E2DBD0';
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x8C7A6B, roughness: 0.7 });
        const headboardMat = new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.85 });
        const mattressMat = new THREE.MeshStandardMaterial({ color: 0xFAF8F5, roughness: 0.9 });
        const duvetMat = new THREE.MeshStandardMaterial({ color: options.accentColor || '#73867B', roughness: 0.8 });

        // 床底架
        const base = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.25, 2.1), frameMat);
        base.position.set(0, 0.125, 0);
        base.castShadow = true;
        base.receiveShadow = true;
        group.add(base);

        // 床頭軟包板
        const headboard = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.95, 0.16), headboardMat);
        headboard.position.set(0, 0.6, -1.02);
        headboard.castShadow = true;
        group.add(headboard);

        // 獨立筒床墊
        const mattress = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.26, 1.95), mattressMat);
        mattress.position.set(0, 0.38, 0.04);
        mattress.castShadow = true;
        group.add(mattress);

        // 羽絨被褥
        const duvet = new THREE.Mesh(new THREE.BoxGeometry(1.77, 0.12, 1.35), duvetMat);
        duvet.position.set(0, 0.54, 0.35);
        duvet.castShadow = true;
        group.add(duvet);

        // 雙人枕頭 (4 顆組合)
        [-0.45, 0.45].forEach(x => {
          const pillowBack = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.14, 0.32), mattressMat);
          pillowBack.position.set(x, 0.58, -0.68);
          pillowBack.rotation.x = 0.2;
          pillowBack.castShadow = true;
          group.add(pillowBack);

          const pillowFront = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.12, 0.28), duvetMat);
          pillowFront.position.set(x, 0.59, -0.48);
          pillowFront.rotation.x = 0.15;
          pillowFront.castShadow = true;
          group.add(pillowFront);
        });

        return group;
      }
    },

    {
      id: 'table_coffee_round',
      name: '北歐雙圓高低茶几組',
      category: 'furniture',
      icon: '🪵',
      dimensions: { lengthCm: 110, widthCm: 80, heightCm: 45 },
      desc: '經典大小雙圓錯層設計，大几為爵士白大理石紋，小几為暖木紋。',
      defaultColor: '#FAF7F2',
      availableColors: ['#FAF7F2', '#333333', '#C4B5A5', '#7D6B58'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const marbleMat = new THREE.MeshStandardMaterial({ color: options.color || '#FAF7F2', roughness: 0.25, metalness: 0.1 });
        const woodMat = new THREE.MeshStandardMaterial({ color: 0xB8936D, roughness: 0.6 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.3, metalness: 0.9 });

        // 大几 (較矮, 40cm, 直徑 65cm)
        const t1 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.03, 32), marbleMat);
        t1.position.set(-0.15, 0.38, 0);
        t1.castShadow = true;
        group.add(t1);

        for (let i = 0; i < 3; i++) {
          const ang = (i * Math.PI * 2) / 3;
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.012, 0.36, 12), metalMat);
          leg.position.set(-0.15 + Math.cos(ang) * 0.25, 0.18, Math.sin(ang) * 0.25);
          leg.castShadow = true;
          group.add(leg);
        }

        // 小几 (較高, 46cm, 直徑 45cm)
        const t2 = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.03, 32), woodMat);
        t2.position.set(0.28, 0.45, 0.12);
        t2.castShadow = true;
        group.add(t2);

        for (let i = 0; i < 3; i++) {
          const ang = (i * Math.PI * 2) / 3 + 0.5;
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.01, 0.43, 12), metalMat);
          leg.position.set(0.28 + Math.cos(ang) * 0.18, 0.215, 0.12 + Math.sin(ang) * 0.18);
          leg.castShadow = true;
          group.add(leg);
        }

        return group;
      }
    },

    {
      id: 'dining_set',
      name: '實木長型餐桌椅組 (一桌四椅)',
      category: 'furniture',
      icon: '🍽️',
      dimensions: { lengthCm: 160, widthCm: 85, heightCm: 76 },
      desc: '北歐白橡木餐桌，搭配四張圓弧靠背餐椅，營造溫馨家庭用餐空間。',
      defaultColor: '#C8A375',
      availableColors: ['#C8A375', '#8C6747', '#333333', '#ECE5DA'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const woodMat = new THREE.MeshStandardMaterial({ color: options.color || '#C8A375', roughness: 0.55 });
        const legMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4, metalness: 0.8 });

        // 餐桌面
        const top = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 0.85), woodMat);
        top.position.set(0, 0.74, 0);
        top.castShadow = true;
        group.add(top);

        // 4 桌腳
        [[-0.72, -0.36], [0.72, -0.36], [-0.72, 0.36], [0.72, 0.36]].forEach(pos => {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.72, 0.05), legMat);
          leg.position.set(pos[0], 0.36, pos[1]);
          leg.castShadow = true;
          group.add(leg);
        });

        // 4 張餐椅 (前後各兩張)
        const chairOffsets = [
          [-0.45, 0.45, 0], [0.45, 0.45, 0],
          [-0.45, -0.45, Math.PI], [0.45, -0.45, Math.PI]
        ];

        chairOffsets.forEach(([cx, cz, rot]) => {
          const chair = new THREE.Group();
          chair.position.set(cx, 0, cz);
          chair.rotation.y = rot;

          // 椅面
          const seat = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.03, 0.4), woodMat);
          seat.position.set(0, 0.44, 0);
          seat.castShadow = true;
          chair.add(seat);

          // 靠背
          const back = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.03), woodMat);
          back.position.set(0, 0.68, 0.18);
          back.castShadow = true;
          chair.add(back);

          // 4 椅腳
          [[-0.17, -0.17], [0.17, -0.17], [-0.17, 0.17], [0.17, 0.17]].forEach(([lx, lz]) => {
            const cl = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.01, 0.44, 8), legMat);
            cl.position.set(lx, 0.22, lz);
            cl.castShadow = true;
            chair.add(cl);
          });

          group.add(chair);
        });

        return group;
      }
    },

    {
      id: 'desk_work',
      name: '簡約工作書桌與人體工學椅',
      category: 'furniture',
      icon: '💻',
      dimensions: { lengthCm: 140, widthCm: 70, heightCm: 75 },
      desc: '極簡現代辦公書桌，附帶可旋轉滾輪人體工學椅與桌上收納盒。',
      defaultColor: '#D2B48C',
      availableColors: ['#D2B48C', '#FFFFFF', '#333333', '#8C7A6B'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const topMat = new THREE.MeshStandardMaterial({ color: options.color || '#D2B48C', roughness: 0.6 });
        const steelMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3, metalness: 0.9 });
        const chairMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 });

        // 桌面
        const top = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.04, 0.7), topMat);
        top.position.set(0, 0.73, 0);
        top.castShadow = true;
        group.add(top);

        // 口字型金屬桌腳 (左右各一)
        [-0.64, 0.64].forEach(x => {
          const legFrame = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.71, 0.66), steelMat);
          legFrame.position.set(x, 0.355, 0);
          legFrame.castShadow = true;
          group.add(legFrame);
        });

        // 筆電 / 螢幕模型
        const monitor = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35, 0.02), steelMat);
        monitor.position.set(0, 0.95, -0.15);
        monitor.castShadow = true;
        group.add(monitor);

        const screenStand = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.18, 8), steelMat);
        screenStand.position.set(0, 0.82, -0.15);
        group.add(screenStand);

        // 辦公椅 (位於桌前)
        const chair = new THREE.Group();
        chair.position.set(0, 0, 0.45);

        const cSeat = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.08, 0.46), chairMat);
        cSeat.position.set(0, 0.46, 0);
        cSeat.castShadow = true;
        chair.add(cSeat);

        const cBack = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.48, 0.06), chairMat);
        cBack.position.set(0, 0.72, 0.2);
        cBack.castShadow = true;
        chair.add(cBack);

        const cPole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.42, 12), steelMat);
        cPole.position.set(0, 0.21, 0);
        chair.add(cPole);

        group.add(chair);
        return group;
      }
    },

    {
      id: 'wardrobe_tall',
      name: '現代落地頂天衣櫃',
      category: 'furniture',
      icon: '🚪',
      dimensions: { lengthCm: 120, widthCm: 60, heightCm: 220 },
      desc: '極簡無把手推拉木質衣櫃，大容量懸掛與疊放收納。',
      defaultColor: '#E8E1D5',
      availableColors: ['#E8E1D5', '#8C7A6B', '#3E424B', '#5A4634'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const bodyMat = new THREE.MeshStandardMaterial({ color: options.color || '#E8E1D5', roughness: 0.7 });
        const handleMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.9 });

        // 櫃體
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.15, 0.6), bodyMat);
        body.position.set(0, 1.075, 0);
        body.castShadow = true;
        body.receiveShadow = true;
        group.add(body);

        // 中間門縫凹槽裝飾
        const groove = new THREE.Mesh(new THREE.BoxGeometry(0.008, 2.1, 0.01), handleMat);
        groove.position.set(0, 1.075, 0.302);
        group.add(groove);

        // 垂直長型霧黑把手 (兩側)
        [-0.04, 0.04].forEach(x => {
          const handle = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.55, 0.02), handleMat);
          handle.position.set(x, 1.05, 0.315);
          group.add(handle);
        });

        return group;
      }
    },

    {
      id: 'bookshelf_open',
      name: '四層開放式展示收納書櫃',
      category: 'furniture',
      icon: '📚',
      dimensions: { lengthCm: 100, widthCm: 35, heightCm: 180 },
      desc: '開放式幾何收納架，擺滿典雅書籍與藝術擺件，提升空間書香氣質。',
      defaultColor: '#7D634C',
      availableColors: ['#7D634C', '#222222', '#F0ECE4', '#A68A68'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const woodMat = new THREE.MeshStandardMaterial({ color: options.color || '#7D634C', roughness: 0.65 });
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x1E1E1E, roughness: 0.4, metalness: 0.8 });

        // 外框 (左右與頂底)
        const frameL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.8, 0.35), frameMat);
        frameL.position.set(-0.485, 0.9, 0);
        frameL.castShadow = true;
        group.add(frameL);

        const frameR = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.8, 0.35), frameMat);
        frameR.position.set(0.485, 0.9, 0);
        frameR.castShadow = true;
        group.add(frameR);

        // 5 層木隔板
        for (let i = 0; i < 5; i++) {
          const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.97, 0.025, 0.34), woodMat);
          shelf.position.set(0, 0.05 + i * 0.42, 0);
          shelf.castShadow = true;
          group.add(shelf);
        }

        // 放幾本不同顏色的書籍擺飾
        const bookColors = [0xC84B31, 0x2D4263, 0xDDBE7A, 0x4E9F3D];
        bookColors.forEach((col, idx) => {
          const book = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.24, 0.2), new THREE.MeshStandardMaterial({ color: col }));
          book.position.set(-0.35 + idx * 0.06, 0.6, 0);
          book.castShadow = true;
          group.add(book);
        });

        return group;
      }
    },

    {
      id: 'bathtub_freestanding',
      name: '衛浴現代獨立蛋型浴缸',
      category: 'furniture',
      icon: '🛁',
      dimensions: { lengthCm: 165, widthCm: 78, heightCm: 60 },
      desc: '極簡流線壓克力獨立式浴缸，附帶落地式鍍鉻天鵝頸立式水龍頭。',
      defaultColor: '#FFFFFF',
      availableColors: ['#FFFFFF', '#1A1A1A', '#E0DCD3'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const tubMat = new THREE.MeshStandardMaterial({ color: options.color || '#FFFFFF', roughness: 0.15, metalness: 0.05 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xE8E8E8, roughness: 0.1, metalness: 0.95 });
        const waterMat = new THREE.MeshStandardMaterial({ color: 0x88C4D8, roughness: 0.1, transparent: true, opacity: 0.7 });

        // 浴缸外身
        const outer = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.34, 0.58, 32), tubMat);
        outer.scale.set(1.9, 1.0, 0.95);
        outer.position.set(0, 0.29, 0);
        outer.castShadow = true;
        group.add(outer);

        // 內部蓄水面
        const water = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.32, 0.02, 32), waterMat);
        water.scale.set(1.85, 1.0, 0.9);
        water.position.set(0, 0.48, 0);
        group.add(water);

        // 落地水龍頭桿
        const faucetPole = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.88, 16), chromeMat);
        faucetPole.position.set(0.85, 0.44, 0);
        faucetPole.castShadow = true;
        group.add(faucetPole);

        // 水龍頭出水彎頭
        const spout = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.03), chromeMat);
        spout.position.set(0.77, 0.88, 0);
        group.add(spout);

        return group;
      }
    },

    {
      id: 'vanity_modern',
      name: '衛浴洗手面盆浴櫃與發光圓鏡',
      category: 'furniture',
      icon: '🪞',
      dimensions: { lengthCm: 100, widthCm: 50, heightCm: 180 },
      desc: '原木懸挑收納浴櫃、純白一體成型面盆，搭配背發光 LED 圓形化妝鏡。',
      defaultColor: '#C8A375',
      availableColors: ['#C8A375', '#333333', '#ECE5DA', '#4A5568'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const cabinetMat = new THREE.MeshStandardMaterial({ color: options.color || '#C8A375', roughness: 0.6 });
        const basinMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.1 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, roughness: 0.2, metalness: 0.9 });
        const mirrorMat = new THREE.MeshStandardMaterial({ color: 0xE8F4F8, roughness: 0.05, metalness: 0.9 });

        // 懸挑下櫃
        const cab = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.45, 0.5), cabinetMat);
        cab.position.set(0, 0.55, 0);
        cab.castShadow = true;
        group.add(cab);

        // 檯面一體盆
        const basin = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.08, 0.52), basinMat);
        basin.position.set(0, 0.8, 0);
        basin.castShadow = true;
        group.add(basin);

        // 水龍頭
        const faucet = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.2, 12), chromeMat);
        faucet.position.set(0, 0.94, -0.15);
        group.add(faucet);

        // 壁掛圓鏡
        const mirror = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.02, 32), mirrorMat);
        mirror.rotation.x = Math.PI / 2;
        mirror.position.set(0, 1.45, -0.24);
        group.add(mirror);

        // 圓鏡背光光環
        const glowRing = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.38, 32), new THREE.MeshBasicMaterial({ color: 0xFFF1D0, side: THREE.DoubleSide }));
        glowRing.position.set(0, 1.45, -0.23);
        group.add(glowRing);

        return group;
      }
    },

    // ================= 家電類 (Appliances) =================
    {
      id: 'tv_oled_console',
      name: '65吋 OLED 超薄電視與低矮電視櫃',
      category: 'appliance',
      icon: '📺',
      dimensions: { lengthCm: 200, widthCm: 40, heightCm: 140 },
      desc: '極窄金屬邊框 4K 電視，配懸浮質感實木電視櫃與金屬支撐架。',
      defaultColor: '#1A1A1A',
      availableColors: ['#1A1A1A', '#8C7A6B', '#3E424B'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const woodMat = new THREE.MeshStandardMaterial({ color: options.color === '#1A1A1A' ? 0x8C7A6B : options.color, roughness: 0.6 });
        const screenMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.5 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.2, metalness: 0.9 });

        // 電視櫃 (長 2m, 深 40cm, 高 32cm)
        const consoleTable = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.32, 0.4), woodMat);
        consoleTable.position.set(0, 0.25, 0);
        consoleTable.castShadow = true;
        group.add(consoleTable);

        // 電視底座
        const stand = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.015, 0.25), metalMat);
        stand.position.set(0, 0.42, 0);
        group.add(stand);

        const pole = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.04), metalMat);
        pole.position.set(0, 0.49, 0);
        group.add(pole);

        // 65 吋螢幕
        const screen = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.84, 0.03), screenMat);
        screen.position.set(0, 0.98, 0);
        screen.castShadow = true;
        group.add(screen);

        // Soundbar 條形音響
        const soundbar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.07), metalMat);
        soundbar.position.set(0, 0.44, 0.12);
        group.add(soundbar);

        return group;
      }
    },

    {
      id: 'fridge_double',
      name: '法式雙門對開大容量冰箱',
      category: 'appliance',
      icon: '🧊',
      dimensions: { lengthCm: 90, widthCm: 75, heightCm: 185 },
      desc: '極簡髮絲紋金屬面板，雙開門冷藏室與大容量下置冷凍抽屜。',
      defaultColor: '#C0C5CA',
      availableColors: ['#C0C5CA', '#22262B', '#EFECE6'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const stainlessMat = new THREE.MeshStandardMaterial({ color: options.color || '#C0C5CA', roughness: 0.3, metalness: 0.7 });
        const blackGlassMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.1 });
        const handleMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.3, metalness: 0.9 });

        // 冰箱主機身
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.82, 0.72), stainlessMat);
        body.position.set(0, 0.92, 0);
        body.castShadow = true;
        group.add(body);

        // 雙門冷藏縫隙
        const seam = new THREE.Mesh(new THREE.BoxGeometry(0.005, 1.1, 0.01), blackGlassMat);
        seam.position.set(0, 1.25, 0.362);
        group.add(seam);

        // 左右長把手
        [-0.05, 0.05].forEach(x => {
          const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.65, 12), handleMat);
          handle.position.set(x, 1.22, 0.385);
          group.add(handle);
        });

        // 下置冷凍抽屜把手
        const freezerHandle = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.02, 0.02), handleMat);
        freezerHandle.position.set(0, 0.42, 0.385);
        group.add(freezerHandle);

        return group;
      }
    },

    {
      id: 'washer_front',
      name: '極簡滾筒洗脫烘一體洗衣機',
      category: 'appliance',
      icon: '🧺',
      dimensions: { lengthCm: 60, widthCm: 60, heightCm: 85 },
      desc: '純白簡潔機身，帶深色大圓形玻璃觀景門與觸控液晶旋鈕。',
      defaultColor: '#FFFFFF',
      availableColors: ['#FFFFFF', '#3A3D40', '#E5E0D8'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const whiteMat = new THREE.MeshStandardMaterial({ color: options.color || '#FFFFFF', roughness: 0.3 });
        const glassMat = new THREE.MeshStandardMaterial({ color: 0x1C2536, roughness: 0.1, metalness: 0.6 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, roughness: 0.2, metalness: 0.9 });

        // 主機身
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.85, 0.6), whiteMat);
        body.position.set(0, 0.425, 0);
        body.castShadow = true;
        group.add(body);

        // 滾筒圓門框
        const doorFrame = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 32), chromeMat);
        doorFrame.rotation.x = Math.PI / 2;
        doorFrame.position.set(0, 0.38, 0.31);
        group.add(doorFrame);

        // 圓門深色玻璃
        const doorGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.032, 32), glassMat);
        doorGlass.rotation.x = Math.PI / 2;
        doorGlass.position.set(0, 0.38, 0.312);
        group.add(doorGlass);

        // 上方面板液晶旋鈕
        const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.02, 24), chromeMat);
        knob.rotation.x = Math.PI / 2;
        knob.position.set(0, 0.74, 0.305);
        group.add(knob);

        return group;
      }
    },

    {
      id: 'kitchen_stove',
      name: '廚房雙口 IH 爐與側吸抽油煙機組',
      category: 'appliance',
      icon: '🍳',
      dimensions: { lengthCm: 90, widthCm: 60, heightCm: 160 },
      desc: '黑色微晶雙口電磁爐檯面，上方搭配不銹鋼側吸斜角抽油煙機。',
      defaultColor: '#1A1A1A',
      availableColors: ['#1A1A1A', '#3C4043', '#CCCCCC'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const glassMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.8 });
        const steelMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, roughness: 0.3, metalness: 0.9 });
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xFF4422 });

        // 爐台底座 (檯面)
        const counter = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.85, 0.6), new THREE.MeshStandardMaterial({ color: 0xEAE5DC, roughness: 0.6 }));
        counter.position.set(0, 0.425, 0);
        counter.castShadow = true;
        group.add(counter);

        // 爐面黑玻璃
        const cooktop = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.01, 0.45), glassMat);
        cooktop.position.set(0, 0.856, 0);
        group.add(cooktop);

        // 雙口爐環 (發光感)
        [-0.18, 0.18].forEach(x => {
          const burner = new THREE.Mesh(new THREE.RingGeometry(0.08, 0.1, 24), ringMat);
          burner.rotation.x = -Math.PI / 2;
          burner.position.set(x, 0.862, 0);
          group.add(burner);
        });

        // 上方抽油煙機
        const hood = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.28, 0.45), steelMat);
        hood.position.set(0, 1.55, -0.05);
        hood.castShadow = true;
        group.add(hood);

        const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.3), steelMat);
        chimney.position.set(0, 1.9, -0.1);
        group.add(chimney);

        return group;
      }
    },

    {
      id: 'ac_wall',
      name: '壁掛式變頻冷暖空調 (分離式冷氣)',
      category: 'appliance',
      icon: '❄️',
      dimensions: { lengthCm: 90, widthCm: 25, heightCm: 32 },
      desc: '極簡懸掛純白空調室內機，可自由調整離地高度懸掛於牆面。',
      defaultColor: '#FFFFFF',
      availableColors: ['#FFFFFF', '#DCD5CB', '#222222'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const acMat = new THREE.MeshStandardMaterial({ color: options.color || '#FFFFFF', roughness: 0.3 });
        const ventMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.5 });

        // 室內機主體
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.3, 0.22), acMat);
        body.position.set(0, 0.15, 0);
        body.castShadow = true;
        group.add(body);

        // 出風導風板
        const flap = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 0.08), ventMat);
        flap.position.set(0, 0.02, 0.08);
        flap.rotation.x = 0.25;
        group.add(flap);

        // LED 溫顯亮點
        const led = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.025), new THREE.MeshBasicMaterial({ color: 0x44D7B6 }));
        led.position.set(0.32, 0.15, 0.112);
        group.add(led);

        // 預設高度設在離地 2.1m
        group.position.y = 2.1;
        return group;
      }
    },

    {
      id: 'oven_microwave',
      name: '廚房多功能微波烤箱一體機',
      category: 'appliance',
      icon: '⏲️',
      dimensions: { lengthCm: 55, widthCm: 45, heightCm: 38 },
      desc: '不銹鋼與黑晶鏡面烤箱，帶側拉把手與數位顯示旋鈕。',
      defaultColor: '#2B2B2B',
      availableColors: ['#2B2B2B', '#E0E0E0', '#B58A63'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const bodyMat = new THREE.MeshStandardMaterial({ color: options.color || '#2B2B2B', roughness: 0.3, metalness: 0.7 });
        const glassMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, roughness: 0.2, metalness: 0.9 });

        // 外殼
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.36, 0.42), bodyMat);
        body.position.set(0, 0.18, 0);
        body.castShadow = true;
        group.add(body);

        // 黑色鏡面門
        const door = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.015), glassMat);
        door.position.set(-0.04, 0.18, 0.215);
        group.add(door);

        // 長拉把
        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.24, 0.03), chromeMat);
        handle.position.set(0.18, 0.18, 0.23);
        group.add(handle);

        // 控制旋鈕
        const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.02, 16), chromeMat);
        knob.rotation.x = Math.PI / 2;
        knob.position.set(0.22, 0.1, 0.215);
        group.add(knob);

        return group;
      }
    },

    // ================= 燈光類 (Lighting - 支援真實 3D 燈光渲染) =================
    {
      id: 'lamp_floor',
      name: '北歐極簡金屬立地燈',
      category: 'lighting',
      icon: '💡',
      dimensions: { lengthCm: 45, widthCm: 45, heightCm: 175 },
      desc: '高雅霧黑/黃銅弧形立燈，自帶溫暖漫射光源，可調節亮度與冷暖色溫。',
      defaultColor: '#D4AF37',
      availableColors: ['#D4AF37', '#1A1A1A', '#FFFFFF', '#A68A68'],
      hasLight: true,
      lightConfig: { type: 'point', defaultIntensity: 1.2, defaultColor: 0xFFE0B2, defaultWarm: true },
      build: (options = {}) => {
        const group = new THREE.Group();
        const metalColor = options.color || '#D4AF37';
        const metalMat = new THREE.MeshStandardMaterial({ color: metalColor, roughness: 0.25, metalness: 0.85 });
        const bulbMat = new THREE.MeshBasicMaterial({ color: 0xFFF1D0 });

        // 圓盤底座
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.03, 32), metalMat);
        base.position.set(0, 0.015, 0);
        base.castShadow = true;
        group.add(base);

        // 細長直立燈桿
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 1.6, 16), metalMat);
        pole.position.set(0, 0.82, 0);
        pole.castShadow = true;
        group.add(pole);

        // 傘狀燈罩
        const shade = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.26, 32, 1, true), metalMat);
        shade.position.set(0, 1.65, 0);
        group.add(shade);

        // 發光燈泡
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), bulbMat);
        bulb.position.set(0, 1.58, 0);
        group.add(bulb);

        // 真實 3D 光源 (PointLight)
        const light = new THREE.PointLight(0xFFE0B2, 1.25, 6.5);
        light.position.set(0, 1.55, 0);
        light.castShadow = true;
        light.shadow.bias = -0.002;
        group.add(light);
        group.userData.dynamicLight = light;
        group.userData.bulbMesh = bulb;

        return group;
      }
    },

    {
      id: 'lamp_pendant',
      name: '現代簡約餐桌吊燈',
      category: 'lighting',
      icon: '🏮',
      dimensions: { lengthCm: 40, widthCm: 40, heightCm: 120 },
      desc: '極簡錐形金屬吊燈，自帶垂懸電線，可調整吊掛高度投射聚光。',
      defaultColor: '#2B2B2B',
      availableColors: ['#2B2B2B', '#D4AF37', '#FAF7F2', '#607D8B'],
      hasLight: true,
      lightConfig: { type: 'spot', defaultIntensity: 1.5, defaultColor: 0xFFE6C4, defaultWarm: true },
      build: (options = {}) => {
        const group = new THREE.Group();
        const metalColor = options.color || '#2B2B2B';
        const shadeMat = new THREE.MeshStandardMaterial({ color: metalColor, roughness: 0.35, metalness: 0.7 });
        const wireMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
        const bulbMat = new THREE.MeshBasicMaterial({ color: 0xFFE6C4 });

        // 吊線
        const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.9, 8), wireMat);
        cord.position.set(0, 0.45, 0);
        group.add(cord);

        // 喇叭型燈罩
        const shade = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.28, 32, 1, true), shadeMat);
        shade.position.set(0, 0, 0);
        shade.castShadow = true;
        group.add(shade);

        // 燈泡
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), bulbMat);
        bulb.position.set(0, -0.05, 0);
        group.add(bulb);

        // 下射聚光 (SpotLight)
        const light = new THREE.SpotLight(0xFFE6C4, 1.5, 7.5, Math.PI / 3, 0.4, 1.2);
        light.position.set(0, -0.06, 0);
        light.target.position.set(0, -3.0, 0);
        light.castShadow = true;
        group.add(light);
        group.add(light.target);

        group.userData.dynamicLight = light;
        group.userData.bulbMesh = bulb;

        // 預設吊掛高度設在離地 1.9m
        group.position.y = 1.95;
        return group;
      }
    },

    {
      id: 'lamp_desk',
      name: '簡約工作閱讀檯燈',
      category: 'lighting',
      icon: '🔦',
      dimensions: { lengthCm: 25, widthCm: 25, heightCm: 48 },
      desc: '雙節關節旋臂檯燈，置於書桌或床頭櫃，投射柔和閱讀光斑。',
      defaultColor: '#1A1A1A',
      availableColors: ['#1A1A1A', '#D4AF37', '#E0E0E0', '#A33327'],
      hasLight: true,
      lightConfig: { type: 'point', defaultIntensity: 0.85, defaultColor: 0xFFF1D8, defaultWarm: true },
      build: (options = {}) => {
        const group = new THREE.Group();
        const metalColor = options.color || '#1A1A1A';
        const mat = new THREE.MeshStandardMaterial({ color: metalColor, roughness: 0.3, metalness: 0.8 });
        const bulbMat = new THREE.MeshBasicMaterial({ color: 0xFFF1D8 });

        // 底座
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.02, 24), mat);
        base.position.set(0, 0.01, 0);
        base.castShadow = true;
        group.add(base);

        // 下支桿
        const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.28, 8), mat);
        arm1.position.set(0, 0.14, 0);
        arm1.rotation.z = -0.15;
        arm1.castShadow = true;
        group.add(arm1);

        // 上支桿
        const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.24, 8), mat);
        arm2.position.set(0.06, 0.36, 0);
        arm2.rotation.z = 0.35;
        arm2.castShadow = true;
        group.add(arm2);

        // 燈罩
        const shade = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.12, 16), mat);
        shade.position.set(0.14, 0.46, 0);
        shade.rotation.z = -0.6;
        group.add(shade);

        // 燈泡
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 12), bulbMat);
        bulb.position.set(0.13, 0.43, 0);
        group.add(bulb);

        // 實體光
        const light = new THREE.PointLight(0xFFF1D8, 0.85, 4.0);
        light.position.set(0.13, 0.42, 0);
        group.add(light);

        group.userData.dynamicLight = light;
        group.userData.bulbMesh = bulb;

        return group;
      }
    },

    {
      id: 'lamp_wall',
      name: '北歐圓弧氛圍壁燈',
      category: 'lighting',
      icon: '🕯️',
      dimensions: { lengthCm: 20, widthCm: 15, heightCm: 25 },
      desc: '上下雙向出光壁燈，投射雅緻洗牆光弧，打造飯店級精緻氛圍。',
      defaultColor: '#C5A059',
      availableColors: ['#C5A059', '#1A1A1A', '#FAF7F2'],
      hasLight: true,
      lightConfig: { type: 'point', defaultIntensity: 0.9, defaultColor: 0xFFDCA8, defaultWarm: true },
      build: (options = {}) => {
        const group = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({ color: options.color || '#C5A059', roughness: 0.3, metalness: 0.7 });
        const bulbMat = new THREE.MeshBasicMaterial({ color: 0xFFDCA8 });

        // 壁掛底座
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16), mat);
        base.rotation.x = Math.PI / 2;
        base.position.set(0, 0, -0.06);
        group.add(base);

        // 柱狀圓形燈體
        const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.22, 24), mat);
        cylinder.position.set(0, 0, 0);
        cylinder.castShadow = true;
        group.add(cylinder);

        // 兩端發光圈
        [-0.1, 0.1].forEach(y => {
          const glow = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.02, 24), bulbMat);
          glow.position.set(0, y, 0);
          group.add(glow);
        });

        // 氛圍光
        const light = new THREE.PointLight(0xFFDCA8, 0.9, 4.5);
        light.position.set(0, 0, 0.08);
        group.add(light);

        group.userData.dynamicLight = light;
        group.userData.bulbMesh = bulbMat;

        // 預設掛在牆壁高度 1.7m
        group.position.y = 1.7;
        return group;
      }
    },

    // ================= 盆景綠植類 (Plants & Bonsai) =================
    {
      id: 'plant_monstera',
      name: '龜背芋陶瓷大型落地盆栽',
      category: 'plant',
      icon: '🪴',
      dimensions: { lengthCm: 70, widthCm: 70, heightCm: 125 },
      desc: '北歐居家標配大綠植，寬大舒展的裂葉造型與純白磨砂陶瓷盆。',
      defaultColor: '#FFFFFF',
      availableColors: ['#FFFFFF', '#3E424B', '#B58A63', '#7D634C'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const potMat = new THREE.MeshStandardMaterial({ color: options.color || '#FFFFFF', roughness: 0.7 });
        const soilMat = new THREE.MeshStandardMaterial({ color: 0x3D2E22, roughness: 0.95 });
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x22552C, roughness: 0.35, side: THREE.DoubleSide });
        const stemMat = new THREE.MeshStandardMaterial({ color: 0x2E6B3B, roughness: 0.5 });

        // 花盆
        const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.46, 24), potMat);
        pot.position.set(0, 0.23, 0);
        pot.castShadow = true;
        group.add(pot);

        // 土壤
        const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.02, 24), soilMat);
        soil.position.set(0, 0.44, 0);
        group.add(soil);

        // 9 片高低舒展的龜背竹葉
        for (let i = 0; i < 9; i++) {
          const angle = (i * Math.PI * 2) / 9 + Math.random() * 0.2;
          const radius = 0.1 + (i % 3) * 0.08;
          const height = 0.55 + (i * 0.08);

          // 葉柄
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.015, height * 0.7, 8), stemMat);
          stem.position.set(Math.cos(angle) * radius * 0.6, 0.45 + height * 0.3, Math.sin(angle) * radius * 0.6);
          stem.rotation.z = Math.cos(angle) * 0.3;
          stem.rotation.x = -Math.sin(angle) * 0.3;
          stem.castShadow = true;
          group.add(stem);

          // 葉片 (大扇面)
          const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.52), leafMat);
          leaf.position.set(Math.cos(angle) * (radius + 0.22), height + 0.25, Math.sin(angle) * (radius + 0.22));
          leaf.rotation.set(0.65 + Math.random() * 0.3, angle + 1.2, 0.25);
          leaf.castShadow = true;
          group.add(leaf);
        }

        return group;
      }
    },

    {
      id: 'plant_bonsai_pine',
      name: '日式禪風五針松盆景',
      category: 'plant',
      icon: '🌲',
      dimensions: { lengthCm: 55, widthCm: 45, heightCm: 65 },
      desc: '蒼勁扭轉的松樹枝幹與層疊松針雲團，搭配紫砂泥古陶盆與景石。',
      defaultColor: '#5C4033',
      availableColors: ['#5C4033', '#2C3E50', '#8C7A6B'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const potMat = new THREE.MeshStandardMaterial({ color: options.color || '#5C4033', roughness: 0.85 });
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4A3525, roughness: 0.9 });
        const pineMat = new THREE.MeshStandardMaterial({ color: 0x1E4D2B, roughness: 0.85 });
        const stoneMat = new THREE.MeshStandardMaterial({ color: 0x6E6E6E, roughness: 0.7 });

        // 紫砂扁盆
        const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.1, 24), potMat);
        pot.scale.set(1.4, 1.0, 0.95);
        pot.position.set(0, 0.05, 0);
        pot.castShadow = true;
        group.add(pot);

        // 苔蘚泥土
        const moss = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.02, 24), new THREE.MeshStandardMaterial({ color: 0x355E3B, roughness: 0.9 }));
        moss.scale.set(1.38, 1.0, 0.93);
        moss.position.set(0, 0.09, 0);
        group.add(moss);

        // 景石擺設
        const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06), stoneMat);
        stone.position.set(-0.16, 0.12, 0.08);
        stone.castShadow = true;
        group.add(stone);

        // 蒼勁主樹幹 (多段微傾)
        const trunkPoints = [
          [0, 0.1, 0, 0.045],
          [0.04, 0.24, 0.02, 0.038],
          [-0.08, 0.38, 0.05, 0.03],
          [0.05, 0.5, 0.02, 0.022]
        ];

        for (let i = 0; i < trunkPoints.length - 1; i++) {
          const p1 = trunkPoints[i];
          const p2 = trunkPoints[i + 1];
          const seg = new THREE.Mesh(new THREE.CylinderGeometry(p2[3], p1[3], 0.15, 10), trunkMat);
          seg.position.set((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, (p1[2] + p2[2]) / 2);
          seg.rotation.z = (p1[0] - p2[0]) * 3;
          seg.castShadow = true;
          group.add(seg);
        }

        // 層疊松針雲團 (綠色球團)
        const cloudPositions = [
          [-0.15, 0.42, 0.06, 0.13],
          [0.18, 0.46, -0.05, 0.14],
          [0.02, 0.58, 0.02, 0.16],
          [-0.05, 0.65, -0.02, 0.12]
        ];

        cloudPositions.forEach(([cx, cy, cz, r]) => {
          const cloud = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), pineMat);
          cloud.scale.set(1.4, 0.5, 1.2);
          cloud.position.set(cx, cy, cz);
          cloud.castShadow = true;
          group.add(cloud);
        });

        return group;
      }
    },

    {
      id: 'plant_fiddle_fig',
      name: '琴葉榕編織提籃落地植栽',
      category: 'plant',
      icon: '🪴',
      dimensions: { lengthCm: 60, widthCm: 60, heightCm: 150 },
      desc: '波西米亞風草編籃，挺拔主幹搭配如小提琴般的油亮大闊葉。',
      defaultColor: '#D2B48C',
      availableColors: ['#D2B48C', '#8C6747', '#FFFFFF'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const basketMat = new THREE.MeshStandardMaterial({ color: options.color || '#D2B48C', roughness: 0.95 });
        const stemMat = new THREE.MeshStandardMaterial({ color: 0x4A3728, roughness: 0.9 });
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x1B4323, roughness: 0.3, side: THREE.DoubleSide });

        // 草編花籃
        const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.19, 0.42, 20), basketMat);
        basket.position.set(0, 0.21, 0);
        basket.castShadow = true;
        group.add(basket);

        // 筆直木質主幹
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 1.15, 8), stemMat);
        trunk.position.set(0, 0.75, 0);
        trunk.castShadow = true;
        group.add(trunk);

        // 小提琴狀葉片沿樹幹旋轉分佈
        for (let i = 0; i < 11; i++) {
          const y = 0.55 + i * 0.085;
          const angle = i * 1.7;
          const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.42), leafMat);
          leaf.position.set(Math.cos(angle) * 0.18, y, Math.sin(angle) * 0.18);
          leaf.rotation.set(0.5, angle, 0.2);
          leaf.castShadow = true;
          group.add(leaf);
        }

        return group;
      }
    },

    {
      id: 'plant_snake',
      name: '虎尾蘭現代水泥直筒盆栽',
      category: 'plant',
      icon: '🌱',
      dimensions: { lengthCm: 35, widthCm: 35, heightCm: 85 },
      desc: '極具建築線條感的金邊虎尾蘭，淨化空氣且不佔動線。',
      defaultColor: '#B0B0B0',
      availableColors: ['#B0B0B0', '#2B2B2B', '#FFFFFF'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const potMat = new THREE.MeshStandardMaterial({ color: options.color || '#B0B0B0', roughness: 0.9 });
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x2A6B3D, roughness: 0.4, side: THREE.DoubleSide });
        const rimMat = new THREE.MeshBasicMaterial({ color: 0xD4AF37 });

        // 水泥直筒盆
        const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.15, 0.36, 24), potMat);
        pot.position.set(0, 0.18, 0);
        pot.castShadow = true;
        group.add(pot);

        // 直立劍形葉片 (7 片圍繞直立)
        for (let i = 0; i < 7; i++) {
          const angle = (i * Math.PI * 2) / 7;
          const height = 0.42 + (i % 3) * 0.08;
          const blade = new THREE.Mesh(new THREE.PlaneGeometry(0.1, height), leafMat);
          blade.position.set(Math.cos(angle) * 0.07, 0.36 + height / 2, Math.sin(angle) * 0.07);
          blade.rotation.y = angle;
          blade.rotation.x = 0.08;
          blade.castShadow = true;
          group.add(blade);
        }

        return group;
      }
    },

    {
      id: 'plant_succulent',
      name: '桌面幾何多肉微景觀',
      category: 'plant',
      icon: '🪴',
      dimensions: { lengthCm: 22, widthCm: 22, heightCm: 18 },
      desc: '多面體陶瓷小花盆，盛裝肥美多汁的綠色石蓮花多肉。',
      defaultColor: '#EBE5DF',
      availableColors: ['#EBE5DF', '#333333', '#C5A059'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const potMat = new THREE.MeshStandardMaterial({ color: options.color || '#EBE5DF', roughness: 0.6, flatShading: true });
        const succulentMat = new THREE.MeshStandardMaterial({ color: 0x629677, roughness: 0.5 });

        // 幾何多面小盆
        const pot = new THREE.Mesh(new THREE.DodecahedronGeometry(0.09), potMat);
        pot.scale.set(1.0, 0.65, 1.0);
        pot.position.set(0, 0.06, 0);
        pot.castShadow = true;
        group.add(pot);

        // 石蓮花肉質瓣瓣 (同心多層小圓瓣)
        for (let layer = 0; layer < 3; layer++) {
          const count = 6 + layer * 3;
          const r = 0.03 + layer * 0.025;
          const y = 0.13 - layer * 0.015;
          for (let i = 0; i < count; i++) {
            const angle = (i * Math.PI * 2) / count;
            const petal = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.05, 8), succulentMat);
            petal.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
            petal.rotation.z = Math.cos(angle) * 0.6;
            petal.rotation.x = -Math.sin(angle) * 0.6;
            group.add(petal);
          }
        }

        return group;
      }
    },

    // ================= 戶外休閒類 (Outdoor & Leisure) =================
    {
      id: 'bbq_grill',
      name: '美式豪華圓蓋炭火 BBQ 烤肉爐',
      category: 'outdoor',
      icon: '🍖',
      dimensions: { lengthCm: 85, widthCm: 70, heightCm: 105 },
      desc: '球型經典美式烤肉爐，帶溫度表、原木握把與下層收納置物網。',
      defaultColor: '#1A1A1A',
      availableColors: ['#1A1A1A', '#A33327', '#2C3E50'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const metalColor = options.color || '#1A1A1A';
        const grillMat = new THREE.MeshStandardMaterial({ color: metalColor, roughness: 0.25, metalness: 0.8 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, roughness: 0.2, metalness: 0.95 });

        // 下爐身 (半球)
        const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), grillMat);
        bowl.position.set(0, 0.65, 0);
        bowl.castShadow = true;
        group.add(bowl);

        // 上爐蓋 (半球)
        const lid = new THREE.Mesh(new THREE.SphereGeometry(0.33, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), grillMat);
        lid.position.set(0, 0.68, 0);
        lid.castShadow = true;
        group.add(lid);

        // 頂部提把
        const handle = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 8, 16, Math.PI), chromeMat);
        handle.position.set(0, 1.02, 0);
        handle.rotation.x = Math.PI / 2;
        group.add(handle);

        // 3 支金屬支撐斜腿
        for (let i = 0; i < 3; i++) {
          const angle = (i * Math.PI * 2) / 3;
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.015, 0.65, 12), chromeMat);
          leg.position.set(Math.cos(angle) * 0.22, 0.32, Math.sin(angle) * 0.22);
          leg.rotation.z = Math.cos(angle) * 0.22;
          leg.rotation.x = -Math.sin(angle) * 0.22;
          leg.castShadow = true;
          group.add(leg);
        }

        // 下層置物三角網
        const rack = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.015, 3), chromeMat);
        rack.position.set(0, 0.2, 0);
        group.add(rack);

        return group;
      }
    },

    {
      id: 'patio_umbrella',
      name: '戶外庭院抗風遮陽大傘',
      category: 'outdoor',
      icon: '⛱️',
      dimensions: { lengthCm: 220, widthCm: 220, heightCm: 240 },
      desc: '大寬幅八角布面庭院遮陽傘，自帶穩固注水底座與斜角抗風立柱。',
      defaultColor: '#F4EBD9',
      availableColors: ['#F4EBD9', '#2E4053', '#8C7A6B', '#3E5C76'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const canopyMat = new THREE.MeshStandardMaterial({ color: options.color || '#F4EBD9', roughness: 0.8, side: THREE.DoubleSide });
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.4, metalness: 0.7 });

        // 注水配重底座
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.4, 0.12, 24), poleMat);
        base.position.set(0, 0.06, 0);
        base.castShadow = true;
        group.add(base);

        // 主立柱
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.35, 16), poleMat);
        pole.position.set(0, 1.2, 0);
        pole.castShadow = true;
        group.add(pole);

        // 八角錐形傘面
        const canopy = new THREE.Mesh(new THREE.ConeGeometry(1.2, 0.45, 8, 1, true), canopyMat);
        canopy.position.set(0, 2.2, 0);
        canopy.castShadow = true;
        group.add(canopy);

        return group;
      }
    },

    {
      id: 'camping_chair',
      name: '折疊露營克米特椅 (兩件組)',
      category: 'outdoor',
      icon: '⛺',
      dimensions: { lengthCm: 120, widthCm: 60, heightCm: 68 },
      desc: '日系戶外風格櫸木折疊露營椅，耐磨軍綠色帆布面料。',
      defaultColor: '#536855',
      availableColors: ['#536855', '#D2B48C', '#222222'],
      build: (options = {}) => {
        const group = new THREE.Group();
        const canvasMat = new THREE.MeshStandardMaterial({ color: options.color || '#536855', roughness: 0.85 });
        const woodMat = new THREE.MeshStandardMaterial({ color: 0xB58A63, roughness: 0.6 });

        [-0.35, 0.35].forEach((offsetX, idx) => {
          const chair = new THREE.Group();
          chair.position.set(offsetX, 0, 0);
          chair.rotation.y = (idx === 0 ? 0.15 : -0.15);

          // 坐面
          const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.02, 0.42), canvasMat);
          seat.position.set(0, 0.35, 0);
          seat.castShadow = true;
          chair.add(seat);

          // 靠背
          const back = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.36, 0.02), canvasMat);
          back.position.set(0, 0.58, 0.18);
          back.rotation.x = 0.25;
          back.castShadow = true;
          chair.add(back);

          // X型交叉椅腳
          [-0.22, 0.22].forEach(x => {
            const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.45, 0.02), woodMat);
            leg1.position.set(x, 0.2, 0);
            leg1.rotation.x = 0.38;
            chair.add(leg1);

            const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.45, 0.02), woodMat);
            leg2.position.set(x, 0.2, 0);
            leg2.rotation.x = -0.38;
            chair.add(leg2);
          });

          group.add(chair);
        });

        return group;
      }
    }
  ],

  // 根據 ID 取得物品定義
  getItemById(id) {
    return this.items.find(item => item.id === id);
  },

  // 根據分類取得物品清單
  getItemsByCategory(category) {
    if (!category || category === 'all') return this.items;
    return this.items.filter(item => item.category === category);
  }
};

window.FurnishingsCatalog = FurnishingsCatalog;
