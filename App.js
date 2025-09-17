import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, ScrollView } from "react-native";

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Russel Pellazar",
      text: "Happy Birthday Self :)",
      likes: 0,
      isLiked: false,
      comments: [],
      showCBox: false,
    },
  ]);

  const upd = (id, fn) => setPosts(ps => ps.map(p => (p.id === id ? fn(p) : p)));
  const like = o => ({
    ...o,
    likes: o.isLiked ? o.likes - 1 : o.likes + 1,
    isLiked: !o.isLiked,
  });

  const addC = (id, t) =>
    t.trim() &&
    upd(id, p => ({
      ...p,
      comments: [
        ...p.comments,
        {
          id: Date.now(),
          text: t,
          likes: 0,
          isLiked: false,
          replies: [],
          showRBox: false,
        },
      ],
    }));

  return (
    <ScrollView style={s.page}>
      {posts.map(p => (
        <View key={p.id} style={s.post}>
          <View style={s.profile}>
            <Image
              source={{ uri: "https://via.placeholder.com/40" }}
              style={s.avatar}
            />
            <Text style={{ fontWeight: "bold" }}>{p.author}</Text>
          </View>

          <Text>{p.text}</Text>

          <View style={s.actions}>
            <Btn onPress={() => upd(p.id, x => like(x))}>
              👍 {p.isLiked ? "Unlike" : "Like"} ({p.likes})
            </Btn>
            <Btn onPress={() => upd(p.id, x => ({ ...x, showCBox: !x.showCBox }))}>
              💬 Comment
            </Btn>
            <Btn onPress={() => alert("Successfully share the post!")}>↗️ Share</Btn>
          </View>

          {p.showCBox && <CBox onS={t => addC(p.id, t)} />}

          {p.comments.map(c => (
            <Com
              key={c.id}
              c={c}
              onLike={() =>
                upd(p.id, x => ({
                  ...x,
                  comments: x.comments.map(y => (y.id === c.id ? like(y) : y)),
                }))
              }
              onRep={t =>
                upd(p.id, x => ({
                  ...x,
                  comments: x.comments.map(y =>
                    y.id === c.id
                      ? {
                          ...y,
                          replies: [...y.replies, { id: Date.now(), text: t }],
                          showRBox: false,
                        }
                      : y
                  ),
                }))
              }
              tog={() =>
                upd(p.id, x => ({
                  ...x,
                  comments: x.comments.map(y =>
                    y.id === c.id ? { ...y, showRBox: !y.showRBox } : y
                  ),
                }))
              }
            />
          ))}
        </View>
      ))}

      {/* Messenger Chat */}
      <MessengerChat />
    </ScrollView>
  );
}

const Btn = ({ children, onPress }) => (
  <TouchableOpacity style={s.btn} onPress={onPress}>
    <Text style={{ color: "white" }}>{children}</Text>
  </TouchableOpacity>
);

const CBox = ({ onS }) => {
  const [t, setT] = useState("");
  return (
    <View style={s.commentBox}>
      <TextInput
        value={t}
        onChangeText={setT}
        placeholder="Write a comment..."
        style={s.input}
      />
      <Btn
        onPress={() => {
          onS(t);
          setT("");
        }}
      >
        Post
      </Btn>
    </View>
  );
};

const Com = ({ c, onLike, onRep, tog }) => {
  const [r, setR] = useState("");
  return (
    <View style={s.comment}>
      <Text>{c.text}</Text>
      <View style={s.commentActions}>
        <TouchableOpacity onPress={onLike}>
          <Text style={s.smallAction}>
            👍 {c.isLiked ? "Unlike" : "Like"} ({c.likes})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={tog}>
          <Text style={s.smallAction}>↩️ Reply</Text>
        </TouchableOpacity>
      </View>

      {c.showRBox && (
        <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
          <TextInput
            value={r}
            onChangeText={setR}
            placeholder="Write a reply..."
            style={{ flex: 1, padding: 6, borderWidth: 1, borderRadius: 6 }}
          />
          <TouchableOpacity
            onPress={() => {
              onRep(r);
              setR("");
            }}
            style={s.replyBtn}
          >
            <Text style={{ color: "white" }}>Reply</Text>
          </TouchableOpacity>
        </View>
      )}

      {c.replies.map(rr => (
        <View key={rr.id} style={s.reply}>
          <Text>{rr.text}</Text>
        </View>
      ))}
    </View>
  );
};

const MessengerChat = () => {
  const [msgs, setMsgs] = useState([{ id: 1, text: "Hi Brother😊", fromMe: false }]);
  const [t, setT] = useState("");

  const send = () => {
    if (!t.trim()) return;
    setMsgs([...msgs, { id: Date.now(), text: t, fromMe: true }]);
    setT("");
  };

  
