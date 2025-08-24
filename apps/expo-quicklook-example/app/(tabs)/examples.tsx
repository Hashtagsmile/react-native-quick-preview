import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { QuickLook } from 'react-native-quicklook';

import type { Item } from '../../data/examples';
import {
  posts,
  products,
  articles,
  destinations,
  tracks,
  profiles,
} from '../../data/examples';

const { width: screenW } = Dimensions.get('window');

const PAD_H = 16;
const GRID_GAP = 4;
const INST_COLS = 3;
const POST_SIZE = Math.floor((screenW - PAD_H * 2 - GRID_GAP * (INST_COLS - 1)) / INST_COLS);
const CARD_W = Math.min(260, Math.round(screenW * 0.7));

export default function ExamplesScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState<Item | null>(null);

  // helpers
  const open = (x: Item) => {
    setItem(x);
    setVisible(true);
  };
  const openWithHaptics = async (x: Item) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    open(x);
  };
  const close = () => setVisible(false);
  const goToDetails = (id: string) => {
    close();
    router.push({ pathname: '/detail', params: { id } });
  };
  const priceText = (p?: number | string) =>
    typeof p === 'number' ? `$${p.toFixed(2)}` : p;
  const num = (n?: number) => (n ? n.toLocaleString() : '0');


  const QuickLookContentWrapper = ({ children, onPress }: { children: React.ReactNode; onPress: () => void }) => {
    return (
      <View style={styles.qlCard} >
        <Pressable onPress={onPress}>
          {children}
        </Pressable>
      </View>
    );
  };

  // different QuickLook content per use-case (no flex:1, no minHeight)
  const renderQuickLook = (x: Item) => {
    console.log("Rendering QuickLook for", x.kind);
    console.log("Item has data: ", x);
    switch (x.kind) {
      case 'post':
        return (
          <QuickLookContentWrapper onPress={() => goToDetails(x.id)}>
            <View style={styles.headerRow}>
              {!!x.avatar && <Image source={{ uri: x.avatar }} style={styles.avatar} />}
              <Text style={styles.metaText}>@{x.username ?? 'user'}</Text>
            </View>
            {!!x.image && <Image source={{ uri: x.image }} style={styles.qlInstagramHero} />}
            <View style={styles.qlViewChip}>
              <Ionicons name="eye" size={12} color="#fff" />
              <Text style={styles.qlViewChipText}>{x.views} views</Text>
            </View>
          </QuickLookContentWrapper>
        );

      case 'product':
        return (
          <QuickLookContentWrapper onPress={() => goToDetails(x.id)}>
            {!!x.image && <Image source={{ uri: x.image }} style={styles.qlHeroSquare} />}
            <View style={styles.qlBody}>
              <Text style={styles.qlTitle}>{x.title}</Text>
              {!!x.subtitle && <Text style={styles.qlSubtitle}>{x.subtitle}</Text>}
              {x.price !== undefined && <Text style={styles.priceText}>{priceText(x.price)}</Text>}
              {!!x.description && (
                <Text style={styles.qlDesc} numberOfLines={4}>{x.description}</Text>
              )}
            </View>
            <View style={styles.qlActions}>
              <TouchableOpacity style={styles.btnPrimary} onPress={() => goToDetails(x.id)}>
                <Text style={styles.btnPrimaryText}>Add to Bag</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnGhost} onPress={() => console.log('Wishlist')}>
                <Text style={styles.btnGhostText}>Wishlist</Text>
              </TouchableOpacity>
            </View>
          </QuickLookContentWrapper>
        );

      case 'article':
        return (
          <QuickLookContentWrapper onPress={() => goToDetails(x.id)}>
            {!!x.image && (
              <Image source={{ uri: x.image }} style={[styles.qlHero, { aspectRatio: 16 / 10 }]} />
            )}
            <View style={styles.qlBody}>
              <Text style={styles.qlTitle}>{x.title}</Text>
              {!!x.subtitle && <Text style={styles.qlSubtitle}>{x.subtitle}</Text>}
              {!!x.description && (
                <Text style={styles.qlDesc} numberOfLines={6}>{x.description}</Text>
              )}
            </View>
            <View style={styles.qlActions}>
              <TouchableOpacity style={styles.btnPrimary} onPress={() => goToDetails(x.id)}>
                <Text style={styles.btnPrimaryText}>Read more</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnGhost} onPress={() => console.log('Save')}>
                <Text style={styles.btnGhostText}>Save</Text>
              </TouchableOpacity>
            </View>
          </QuickLookContentWrapper>
        );

      case 'destination':
        return (
          <QuickLookContentWrapper onPress={() => goToDetails(x.id)}>
            {!!x.image && <Image source={{ uri: x.image }} style={styles.qlHero} />}
            <View style={styles.qlBody}>
              <Text style={styles.qlTitle}>{x.title}</Text>
              {!!x.subtitle && <Text style={styles.qlSubtitle}>{x.subtitle}</Text>}
              {!!x.price && <Text style={[styles.priceText, { marginTop: 4 }]}>{x.price}</Text>}
              {!!x.description && (
                <Text style={styles.qlDesc} numberOfLines={5}>{x.description}</Text>
              )}
            </View>
            <View style={styles.qlActions}>
              <TouchableOpacity style={styles.btnPrimary} onPress={() => goToDetails(x.id)}>
                <Text style={styles.btnPrimaryText}>Book Trip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnGhost} onPress={close}>
                <Text style={styles.btnGhostText}>Close</Text>
              </TouchableOpacity>
            </View>
          </QuickLookContentWrapper>
        );

        case 'track':
          return (
            <QuickLookContentWrapper onPress={() => goToDetails(x.id)}>
              {/* Cover art */}
              {!!x.image && <Image source={{ uri: x.image }} style={styles.spotifyArt} />}
        
        <View style={styles.spotifyContent}>  
              {/* Title / artist */}
              <View style={styles.spotifyMeta}>
                <Text style={styles.spotifyTitle} numberOfLines={1}>{x.title}</Text>
                {!!x.artist && (
                  <Text style={styles.spotifyArtist} numberOfLines={1}>
                    {x.artist}{x.duration ? ` • ${x.duration}` : ''}
                  </Text>
                )}
              </View>
        
              {/* Progress bar (static demo fill width) */}
              <View style={styles.spotifyProgressWrap}>
                <View style={styles.spotifyProgressTrack}>
                  <View style={[styles.spotifyProgressFill, { width: '28%' }]} />
                </View>
                <View style={styles.spotifyTimes}>
                  <Text style={styles.spotifyTime}>0:42</Text>
                  <Text style={styles.spotifyTime}>{x.duration ?? '3:30'}</Text>
                </View>
              </View>
        
              {/* Controls */}
              <View style={styles.spotifyControls}>
                <TouchableOpacity style={styles.ctrlBtn} onPress={() => console.log('Like')}>
                  <Ionicons name="heart-outline" size={20} color="#fff" />
                </TouchableOpacity>
        
                <View style={styles.transport}>
                  <TouchableOpacity style={styles.ctrlBtn} onPress={() => console.log('Prev')}>
                    <Ionicons name="play-skip-back" size={24} color="#fff" />
                  </TouchableOpacity>
        
                  <TouchableOpacity
                    style={styles.playBtn}
                    onPress={() => console.log('Play preview')}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="play" size={28} color="#000" />
                  </TouchableOpacity>
        
                  <TouchableOpacity style={styles.ctrlBtn} onPress={() => console.log('Next')}>
                    <Ionicons name="play-skip-forward" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
        
                <TouchableOpacity style={styles.ctrlBtn} onPress={() => console.log('More')}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              </View>
            </QuickLookContentWrapper>
          );
        

      case 'profile':
      default:
        return (
          <QuickLookContentWrapper onPress={() => goToDetails(x.id)}>
            {!!x.image && (
              <View style={{ alignItems: 'center', paddingTop: 16 }}>
                <Image
                  source={{ uri: x.image }}
                  style={{ width: 84, height: 84, borderRadius: 42, backgroundColor: '#eee' }}
                />
              </View>
            )}
            <View style={[styles.qlBody, { alignItems: 'center' }]}>
              <Text style={styles.qlTitle}>{x.title}</Text>
              {!!x.subtitle && <Text style={styles.qlSubtitle}>{x.subtitle}</Text>}
              {!!x.description && (
                <Text style={[styles.qlDesc, { textAlign: 'center' }]} numberOfLines={5}>
                  {x.description}
                </Text>
              )}
            </View>
            <View style={styles.qlActions}>
              <TouchableOpacity style={styles.btnPrimary} onPress={() => goToDetails(x.id)}>
                <Text style={styles.btnPrimaryText}>View profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnGhost} onPress={() => console.log('Follow')}>
                <Text style={styles.btnGhostText}>Follow</Text>
              </TouchableOpacity>
            </View>
          </QuickLookContentWrapper>
        );
    }
  };

  // rows
  const renderInstagramGrid = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Instagram-like grid (long-press to preview)</Text>
      <View style={styles.instaGrid}>
        {posts.map((p) => (
          <TouchableOpacity
            key={p.id}
            activeOpacity={0.85}
            onPress={() => goToDetails(p.id)}           // tap → details
            onLongPress={() => openWithHaptics(p)}      // long-press → QuickLook + haptic
            delayLongPress={450}
          >
            <View style={styles.instaTile}>
              {p.image ? (
                <Image source={{ uri: p.image }} style={styles.instaImg} />
              ) : (
                <View style={[styles.instaImg, styles.fallback]}>
                  <Text style={styles.fallbackText}>No image</Text>
                </View>
              )}
              <View style={styles.instaPill}>
                <Ionicons name="eye" size={12} color="#fff" />
                <Text style={styles.instaPillText}>{num(p.views)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderEcommerceRow = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>E-commerce (tap → details, long-press → QuickLook)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroller}>
        {products.map((s) => (
          <TouchableOpacity
            key={s.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => goToDetails(s.id)}
            onLongPress={() => openWithHaptics(s)}
            delayLongPress={450}
          >
            <View>
              {s.image ? (
                <Image source={{ uri: s.image }} style={styles.cardImg} />
              ) : (
                <View style={[styles.cardImg, styles.fallback]}>
                  <Text style={styles.fallbackText}>No image</Text>
                </View>
              )}
              {s.price !== undefined && (
                <View style={styles.priceBadge}>
                  <Text style={styles.priceBadgeText}>{priceText(s.price)}</Text>
                </View>
              )}
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {s.title}
              </Text>
              {!!s.subtitle && (
                <Text style={styles.cardSubtitle} numberOfLines={1}>
                  {s.subtitle}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderArticleRow = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Articles / Blog</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroller}>
        {articles.map((a) => (
          <TouchableOpacity
            key={a.id}
            style={[styles.card, { width: CARD_W + 20 }]}
            activeOpacity={0.9}
            onPress={() => goToDetails(a.id)}
            onLongPress={() => openWithHaptics(a)}
            delayLongPress={450}
          >
            {a.image ? (
              <Image source={{ uri: a.image }} style={[styles.cardImg, { height: 120 }]} />
            ) : (
              <View style={[styles.cardImg, { height: 120 }, styles.fallback]}>
                <Text style={styles.fallbackText}>No image</Text>
              </View>
            )}
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {a.title}
              </Text>
              {!!a.subtitle && (
                <Text style={styles.cardSubtitle} numberOfLines={1}>
                  {a.subtitle}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderTravelRow = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Travel</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroller}>
        {destinations.map((d) => (
          <TouchableOpacity
            key={d.id}
            style={[styles.card, { width: CARD_W }]}
            activeOpacity={0.9}
            onPress={() => goToDetails(d.id)}
            onLongPress={() => openWithHaptics(d)}
            delayLongPress={450}
          >
            <View>
              {d.image ? (
                <Image source={{ uri: d.image }} style={[styles.cardImg, { height: 130 }]} />
              ) : (
                <View style={[styles.cardImg, { height: 130 }, styles.fallback]}>
                  <Text style={styles.fallbackText}>No image</Text>
                </View>
              )}
              {!!d.price && (
                <View style={[styles.priceBadge, { backgroundColor: '#111' }]}>
                  <Text style={[styles.priceBadgeText, { color: '#fff' }]}>{d.price}</Text>
                </View>
              )}
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {d.title}
              </Text>
              {!!d.subtitle && (
                <Text style={styles.cardSubtitle} numberOfLines={1}>
                  {d.subtitle}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderMusicRow = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Music</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroller}>
        {tracks.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.card, { width: 220 }]}
            activeOpacity={0.9}
            onPress={() => goToDetails(t.id)}
            onLongPress={() => openWithHaptics(t)}
            delayLongPress={450}
          >
            {t.image ? (
              <Image source={{ uri: t.image }} style={[styles.cardImg, { height: 120 }]} />
            ) : (
              <View style={[styles.cardImg, { height: 120 }, styles.fallback]}>
                <Text style={styles.fallbackText}>No cover</Text>
              </View>
            )}
            <View style={styles.musicCardBody}>
              <Text style={styles.musicCardTitle} numberOfLines={1}>
                {t.title}
              </Text>
              {!!t.artist && (
                <Text style={styles.musicCardSubtitle} numberOfLines={1}>
                  {t.artist} {!!t.duration && `• ${t.duration}`}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderProfilesRow = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Profiles</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroller}>
        {profiles.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.card, { width: 200, alignItems: 'center', paddingBottom: 12 }]}
            activeOpacity={0.9}
            onPress={() => goToDetails(p.id)}
            onLongPress={() => openWithHaptics(p)}
            delayLongPress={450}
          >
            <View style={{ paddingTop: 16 }}>
              <Image
                source={{ uri: p.image }}
                style={{ width: 84, height: 84, borderRadius: 42, backgroundColor: '#eee' }}
              />
            </View>
            <View style={[styles.cardBody, { alignItems: 'center' }]}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {p.title}
              </Text>
              {!!p.subtitle && (
                <Text style={styles.cardSubtitle} numberOfLines={1}>
                  {p.subtitle}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.pageTitle}>Examples</Text>
        <Text style={styles.pageSubtitle}>
          Tap → details. Long-press → QuickLook (+ haptics). In QuickLook, tap anywhere to navigate.
        </Text>

        {renderInstagramGrid()}
        {renderEcommerceRow()}
        {renderArticleRow()}
        {renderTravelRow()}
        {renderMusicRow()}
        {renderProfilesRow()}

        <QuickLook
          visible={visible}
          onClose={close}
          enableSwipeToClose
          closeOnBackdropPress
          testID="ql-examples"
          accessibilityLabel="Quick look preview"
        >
          {!!item && renderQuickLook(item)}
        </QuickLook>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  screen: { padding: PAD_H, paddingBottom: 24 },

  pageTitle: { fontSize: 24, fontWeight: '800', color: '#111' },
  pageSubtitle: { fontSize: 14, color: '#6c757d', marginTop: 6, marginBottom: 14 },

  section: { marginTop: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#212529', marginBottom: 10 },

  // Instagram grid
  instaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: GRID_GAP },
  instaTile: {
    width: POST_SIZE,
    height: POST_SIZE,
    position: 'relative',
    backgroundColor: '#eee',
    overflow: 'hidden',
    borderRadius: 6,
  },
  instaImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  instaPill: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  instaPillText: { color: '#fff', fontSize: 11, marginLeft: 4 },

  // Horizontal scrollers
  hScroller: { gap: 12, paddingRight: 6 },
  musicCardBody: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.55)', padding: 12 },
  musicCardTitle: { color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  musicCardSubtitle: { color: '#fff', fontSize: 12, fontWeight: '700', marginBottom: 4 },
  card: {
    width: CARD_W,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardImg: { width: '100%', height: 140, resizeMode: 'cover' },
  fallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f3f5' },
  fallbackText: { fontSize: 12, color: '#999' },
  cardBody: { padding: 10, gap: 4 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#212529' },
  cardSubtitle: { fontSize: 12, color: '#6c757d' },

  priceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  priceBadgeText: { fontSize: 12, fontWeight: '800', color: '#111' },

  // QuickLook content (no flex:1, no minHeight)
  qlCard: {
    backgroundColor: '#fff',
  },
  qlHero: { width: '100%', aspectRatio: 16 / 9, resizeMode: 'cover' },
  qlInstagramHero: { width: '100%', aspectRatio: 1, resizeMode: 'cover' },
  qlHeroSquare: { width: '100%', aspectRatio: 1, resizeMode: 'cover' },
  qlBody: { padding: 16 },
  qlTitle: { fontSize: 20, fontWeight: '800', color: '#212529' },
  qlSubtitle: { fontSize: 14, color: '#6c757d', marginTop: 4 },
  qlDesc: { fontSize: 14, color: '#555', marginTop: 10, lineHeight: 20 },
  qlViewChip: { position: 'absolute', right: 12, bottom: 12, backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, flexDirection: 'row', alignItems: 'center' },
  qlViewChipText: { color: '#fff', fontSize: 11, marginLeft: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'center',  padding: 12 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#eee', marginRight: 8 },
  metaText: { fontSize: 12, color: '#6c757d' },
  priceText: { fontSize: 18, fontWeight: '800', color: '#0095f6', marginTop: 8 },

  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  tag: { backgroundColor: '#f1f3f5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  tagText: { fontSize: 12, color: '#6c757d' },

  qlActions: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: '#0095f6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnPrimaryText: { color: '#fff', fontWeight: '800' },
  btnGhost: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  btnGhostText: { color: '#212529', fontWeight: '700' },

  // Spotify-like (dark) track preview
spotifyArt: {
  width: '100%',
  aspectRatio: 1,
  resizeMode: 'cover',
  backgroundColor: '#222',
  // small rounded corners to match Spotify feel
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
},

spotifyMeta: {
  paddingHorizontal: 16,
  paddingTop: 14,
},
spotifyTitle: { fontSize: 18, fontWeight: '800', color: '#fff' },
spotifyArtist: { fontSize: 13, color: '#b3b3b3', marginTop: 4 },

spotifyProgressWrap: {
  paddingHorizontal: 16,
  paddingTop: 10,
},
spotifyProgressTrack: {
  height: 3,
  borderRadius: 3,
  backgroundColor: '#2a2a2a',
  overflow: 'hidden',
},
spotifyProgressFill: {
  height: '100%',
  backgroundColor: '#1DB954', // Spotify green
},
spotifyTimes: {
  marginTop: 6,
  flexDirection: 'row',
  justifyContent: 'space-between',
},
spotifyTime: { fontSize: 11, color: '#7a7a7a' },

spotifyControls: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 10,
  paddingVertical: 12,
  borderTopWidth: StyleSheet.hairlineWidth,
  borderTopColor: '#1f1f1f',
},
spotifyContent: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.60)',

},
transport: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 18,
},
ctrlBtn: {
  padding: 8,
},
playBtn: {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: '#1DB954',
  alignItems: 'center',
  justifyContent: 'center',
},
});
