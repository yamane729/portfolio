                        // NHKニュースのRSSフィードURL
                        const feedUrl = 'https://www3.nhk.or.jp/rss/news/cat0.xml';
                    
                        // RSSフィードを取得して、HTMLに表示
                        function fetchRSS() {
                          // XMLHttpRequestを使ってRSSフィードを取得
                          fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`)
                            .then(response => response.json())
                            .then(data => {
                              const xmlString = data.contents; // 取得したRSSの内容（XML）
                              const parser = new DOMParser();
                              const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
                              const items = xmlDoc.getElementsByTagName('item'); // RSSアイテムを取得
                              const list = document.getElementById('rss-feed-list');
                    
                              // アイテムが存在すれば、リストに追加
                              for (let i = 0; i < items.length; i++) {
                                const item = items[i];
                                const title = item.getElementsByTagName('title')[0].textContent;
                                const link = item.getElementsByTagName('link')[0].textContent;
                    
                                // リストアイテムを作成
                                const li = document.createElement('li');
                                const a = document.createElement('a');
                                a.href = link;
                                a.textContent = title;
                                li.appendChild(a);
                                list.appendChild(li);
                              }
                            })
                            .catch(error => console.error('RSSの取得に失敗しました:', error));
                        }
                    
                        // RSSフィードを取得して表示
                        fetchRSS();