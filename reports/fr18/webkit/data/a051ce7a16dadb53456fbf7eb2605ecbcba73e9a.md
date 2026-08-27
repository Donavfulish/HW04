# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr18-order-admin.spec.ts >> FR-18 Order Admin | Run by: 23127044 >> FR18-DT-09 BUG canceled shows mark delivered
- Location: specs/fr18-order-admin.spec.ts:147:9

# Error details

```
Error: BUG-C4: canceled order must not show Đánh dấu Đã giao

expect(locator).toHaveCount(expected) failed

Locator:  locator('table tbody tr').filter({ hasText: '#118' }).getByRole('button', { name: /Đánh dấu Đã giao/i })
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - BUG-C4: canceled order must not show Đánh dấu Đã giao with timeout 5000ms
  - waiting for locator('table tbody tr').filter({ hasText: '#118' }).getByRole('button', { name: /Đánh dấu Đã giao/i })
    14 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - heading "EShop Admin" [level=1] [ref=e5]
    - list [ref=e6]:
      - listitem [ref=e7] [cursor=pointer]: Dashboard
      - listitem [ref=e8] [cursor=pointer]: Danh mục
      - listitem [ref=e9] [cursor=pointer]: Sản phẩm
      - listitem [ref=e10] [cursor=pointer]: Mã Giảm Giá
      - listitem [ref=e11] [cursor=pointer]: Đơn hàng
      - listitem [ref=e12] [cursor=pointer]: Người dùng
      - listitem [ref=e13] [cursor=pointer]: Đăng xuất
  - generic [ref=e15]:
    - heading "Quản lý Đơn hàng" [level=2] [ref=e16]
    - table [ref=e17]:
      - rowgroup [ref=e18]:
        - row [ref=e19]:
          - columnheader "ID" [ref=e20]
          - columnheader "Người đặt" [ref=e21]
          - columnheader "Tổng tiền" [ref=e22]
          - columnheader "Địa chỉ" [ref=e23]
          - columnheader "Trạng thái" [ref=e24]
          - columnheader "Hành động" [ref=e25]
      - rowgroup [ref=e26]:
        - row [ref=e27]:
          - cell "#118" [ref=e28]
          - cell "Test User" [ref=e29]
          - cell "100,997 ₫" [ref=e30]
          - cell "FR18 test addr 1787764277574" [ref=e31]
          - cell "Đã hủy" [ref=e32]
          - cell [ref=e33]:
            - button "Đánh dấu Đã giao" [ref=e35] [cursor=pointer]
        - row [ref=e36]:
          - cell "#117" [ref=e37]
          - cell "Test User" [ref=e38]
          - cell "100,093 ₫" [ref=e39]
          - cell "FR18 test addr 1787764277166" [ref=e40]
          - cell "Đã giao" [ref=e41]
          - cell [ref=e42]
        - row [ref=e43]:
          - cell "#116" [ref=e44]
          - cell "Test User" [ref=e45]
          - cell "100,229 ₫" [ref=e46]
          - cell "FR18 test addr 1787764276741" [ref=e47]
          - cell "Đang giao" [ref=e48]
          - cell [ref=e49]:
            - button "Hoàn thành" [ref=e51] [cursor=pointer]
        - row [ref=e52]:
          - cell "#115" [ref=e53]
          - cell "Test User" [ref=e54]
          - cell "100,989 ₫" [ref=e55]
          - cell "FR18 test addr 1787764276317" [ref=e56]
          - cell "Đã xác nhận" [ref=e57]
          - cell [ref=e58]:
            - generic [ref=e59]:
              - button "Giao hàng" [ref=e60] [cursor=pointer]
              - button "Hủy" [ref=e61] [cursor=pointer]
        - row [ref=e62]:
          - cell "#114" [ref=e63]
          - cell "Test User" [ref=e64]
          - cell "100,506 ₫" [ref=e65]
          - cell "FR18 test addr 1787764275884" [ref=e66]
          - cell "Chờ xác nhận" [ref=e67]
          - cell [ref=e68]:
            - generic [ref=e69]:
              - button "Xác nhận" [ref=e70] [cursor=pointer]
              - button "Hủy" [ref=e71] [cursor=pointer]
        - row [ref=e72]:
          - cell "#113" [ref=e73]
          - cell "Test User" [ref=e74]
          - cell "50,000 ₫" [ref=e75]
          - cell "Chưa cập nhật" [ref=e76]
          - cell "Chờ xác nhận" [ref=e77]
          - cell [ref=e78]:
            - generic [ref=e79]:
              - button "Xác nhận" [ref=e80] [cursor=pointer]
              - button "Hủy" [ref=e81] [cursor=pointer]
        - row [ref=e82]:
          - cell "#112" [ref=e83]
          - cell "Test User" [ref=e84]
          - cell "50,000 ₫" [ref=e85]
          - cell "123 Duong ABC Q1" [ref=e86]
          - cell "Chờ xác nhận" [ref=e87]
          - cell [ref=e88]:
            - generic [ref=e89]:
              - button "Xác nhận" [ref=e90] [cursor=pointer]
              - button "Hủy" [ref=e91] [cursor=pointer]
        - row [ref=e92]:
          - cell "#111" [ref=e93]
          - cell "Test User" [ref=e94]
          - cell "50,000 ₫" [ref=e95]
          - cell [ref=e96]
          - cell "Chờ xác nhận" [ref=e98]
          - cell [ref=e99]:
            - generic [ref=e100]:
              - button "Xác nhận" [ref=e101] [cursor=pointer]
              - button "Hủy" [ref=e102] [cursor=pointer]
        - row [ref=e103]:
          - cell "#110" [ref=e104]
          - cell "Test User" [ref=e105]
          - cell "100,000 ₫" [ref=e106]
          - cell "FR18 test addr 1787764262124" [ref=e107]
          - cell "Đã giao" [ref=e108]
          - cell [ref=e109]
        - row [ref=e110]:
          - cell "#109" [ref=e111]
          - cell "Test User" [ref=e112]
          - cell "500,000 ₫" [ref=e113]
          - cell "FR18 test addr 1787764260083" [ref=e114]
          - cell "Đã giao" [ref=e115]
          - cell [ref=e116]
        - row [ref=e117]:
          - cell "#108" [ref=e118]
          - cell "Test User" [ref=e119]
          - cell "100,394 ₫" [ref=e120]
          - cell "FR18 test addr 1787764256654" [ref=e121]
          - cell "Đã giao" [ref=e122]
          - cell [ref=e123]
        - row [ref=e124]:
          - cell "#107" [ref=e125]
          - cell "Test User" [ref=e126]
          - cell "100,573 ₫" [ref=e127]
          - cell "FR18 test addr 1787764249718" [ref=e128]
          - cell "Đã hủy" [ref=e129]
          - cell [ref=e130]:
            - button "Đánh dấu Đã giao" [ref=e132] [cursor=pointer]
        - row [ref=e133]:
          - cell "#106" [ref=e134]
          - cell "Test User" [ref=e135]
          - cell "100,310 ₫" [ref=e136]
          - cell "FR18 test addr 1787764249206" [ref=e137]
          - cell "Đã giao" [ref=e138]
          - cell [ref=e139]
        - row [ref=e140]:
          - cell "#105" [ref=e141]
          - cell "Test User" [ref=e142]
          - cell "100,511 ₫" [ref=e143]
          - cell "FR18 test addr 1787764248697" [ref=e144]
          - cell "Đang giao" [ref=e145]
          - cell [ref=e146]:
            - button "Hoàn thành" [ref=e148] [cursor=pointer]
        - row [ref=e149]:
          - cell "#104" [ref=e150]
          - cell "Test User" [ref=e151]
          - cell "100,921 ₫" [ref=e152]
          - cell "FR18 test addr 1787764248029" [ref=e153]
          - cell "Đã xác nhận" [ref=e154]
          - cell [ref=e155]:
            - generic [ref=e156]:
              - button "Giao hàng" [ref=e157] [cursor=pointer]
              - button "Hủy" [ref=e158] [cursor=pointer]
        - row [ref=e159]:
          - cell "#103" [ref=e160]
          - cell "Test User" [ref=e161]
          - cell "100,305 ₫" [ref=e162]
          - cell "FR18 test addr 1787764247507" [ref=e163]
          - cell "Chờ xác nhận" [ref=e164]
          - cell [ref=e165]:
            - generic [ref=e166]:
              - button "Xác nhận" [ref=e167] [cursor=pointer]
              - button "Hủy" [ref=e168] [cursor=pointer]
        - row [ref=e169]:
          - cell "#102" [ref=e170]
          - cell "Test User" [ref=e171]
          - cell "50,000 ₫" [ref=e172]
          - cell "Chưa cập nhật" [ref=e173]
          - cell "Chờ xác nhận" [ref=e174]
          - cell [ref=e175]:
            - generic [ref=e176]:
              - button "Xác nhận" [ref=e177] [cursor=pointer]
              - button "Hủy" [ref=e178] [cursor=pointer]
        - row [ref=e179]:
          - cell "#101" [ref=e180]
          - cell "Test User" [ref=e181]
          - cell "50,000 ₫" [ref=e182]
          - cell "123 Duong ABC Q1" [ref=e183]
          - cell "Chờ xác nhận" [ref=e184]
          - cell [ref=e185]:
            - generic [ref=e186]:
              - button "Xác nhận" [ref=e187] [cursor=pointer]
              - button "Hủy" [ref=e188] [cursor=pointer]
        - row [ref=e189]:
          - cell "#100" [ref=e190]
          - cell "Test User" [ref=e191]
          - cell "50,000 ₫" [ref=e192]
          - cell [ref=e193]
          - cell "Chờ xác nhận" [ref=e195]
          - cell [ref=e196]:
            - generic [ref=e197]:
              - button "Xác nhận" [ref=e198] [cursor=pointer]
              - button "Hủy" [ref=e199] [cursor=pointer]
        - row [ref=e200]:
          - cell "#99" [ref=e201]
          - cell "Test User" [ref=e202]
          - cell "100,000 ₫" [ref=e203]
          - cell "FR18 test addr 1787764237477" [ref=e204]
          - cell "Đã giao" [ref=e205]
          - cell [ref=e206]
        - row [ref=e207]:
          - cell "#98" [ref=e208]
          - cell "Test User" [ref=e209]
          - cell "500,000 ₫" [ref=e210]
          - cell "FR18 test addr 1787764236788" [ref=e211]
          - cell "Đã giao" [ref=e212]
          - cell [ref=e213]
        - row [ref=e214]:
          - cell "#97" [ref=e215]
          - cell "Test User" [ref=e216]
          - cell "100,085 ₫" [ref=e217]
          - cell "FR18 test addr 1787764235012" [ref=e218]
          - cell "Đã giao" [ref=e219]
          - cell [ref=e220]
        - row [ref=e221]:
          - cell "#96" [ref=e222]
          - cell "Test User" [ref=e223]
          - cell "100,036 ₫" [ref=e224]
          - cell "FR18 test addr 1787764229265" [ref=e225]
          - cell "Đã hủy" [ref=e226]
          - cell [ref=e227]:
            - button "Đánh dấu Đã giao" [ref=e229] [cursor=pointer]
        - row [ref=e230]:
          - cell "#95" [ref=e231]
          - cell "Test User" [ref=e232]
          - cell "100,051 ₫" [ref=e233]
          - cell "FR18 test addr 1787764228956" [ref=e234]
          - cell "Đã giao" [ref=e235]
          - cell [ref=e236]
        - row [ref=e237]:
          - cell "#94" [ref=e238]
          - cell "Test User" [ref=e239]
          - cell "100,831 ₫" [ref=e240]
          - cell "FR18 test addr 1787764228639" [ref=e241]
          - cell "Đang giao" [ref=e242]
          - cell [ref=e243]:
            - button "Hoàn thành" [ref=e245] [cursor=pointer]
        - row [ref=e246]:
          - cell "#93" [ref=e247]
          - cell "Test User" [ref=e248]
          - cell "100,606 ₫" [ref=e249]
          - cell "FR18 test addr 1787764228343" [ref=e250]
          - cell "Đã xác nhận" [ref=e251]
          - cell [ref=e252]:
            - generic [ref=e253]:
              - button "Giao hàng" [ref=e254] [cursor=pointer]
              - button "Hủy" [ref=e255] [cursor=pointer]
        - row [ref=e256]:
          - cell "#92" [ref=e257]
          - cell "Test User" [ref=e258]
          - cell "100,413 ₫" [ref=e259]
          - cell "FR18 test addr 1787764228030" [ref=e260]
          - cell "Chờ xác nhận" [ref=e261]
          - cell [ref=e262]:
            - generic [ref=e263]:
              - button "Xác nhận" [ref=e264] [cursor=pointer]
              - button "Hủy" [ref=e265] [cursor=pointer]
        - row [ref=e266]:
          - cell "#91" [ref=e267]
          - cell "Test User" [ref=e268]
          - cell "100,346 ₫" [ref=e269]
          - cell "FR10 test addr 1787764226522" [ref=e270]
          - cell "Đã xác nhận" [ref=e271]
          - cell [ref=e272]:
            - generic [ref=e273]:
              - button "Giao hàng" [ref=e274] [cursor=pointer]
              - button "Hủy" [ref=e275] [cursor=pointer]
        - row [ref=e276]:
          - cell "#90" [ref=e277]
          - cell "Test User" [ref=e278]
          - cell "100,677 ₫" [ref=e279]
          - cell "FR10 test addr 1787764226048" [ref=e280]
          - cell "Đã hủy" [ref=e281]
          - cell [ref=e282]:
            - button "Đánh dấu Đã giao" [ref=e284] [cursor=pointer]
        - row [ref=e285]:
          - cell "#89" [ref=e286]
          - cell "Test User" [ref=e287]
          - cell "100,559 ₫" [ref=e288]
          - cell "FR10 test addr 1787764225577" [ref=e289]
          - cell "Đã giao" [ref=e290]
          - cell [ref=e291]
        - row [ref=e292]:
          - cell "#88" [ref=e293]
          - cell "Test User" [ref=e294]
          - cell "100,739 ₫" [ref=e295]
          - cell "FR10 test addr 1787764219504" [ref=e296]
          - cell "Đang giao" [ref=e297]
          - cell [ref=e298]:
            - button "Hoàn thành" [ref=e300] [cursor=pointer]
        - row [ref=e301]:
          - cell "#87" [ref=e302]
          - cell "Test User" [ref=e303]
          - cell "100,042 ₫" [ref=e304]
          - cell "FR10 test addr 1787764219207" [ref=e305]
          - cell "Đã giao" [ref=e306]
          - cell [ref=e307]
        - row [ref=e308]:
          - cell "#86" [ref=e309]
          - cell "Test User" [ref=e310]
          - cell "100,854 ₫" [ref=e311]
          - cell "FR10 test addr 1787764218405" [ref=e312]
          - cell "Đã hủy" [ref=e313]
          - cell [ref=e314]:
            - button "Đánh dấu Đã giao" [ref=e316] [cursor=pointer]
        - row [ref=e317]:
          - cell "#85" [ref=e318]
          - cell "Test User" [ref=e319]
          - cell "100,610 ₫" [ref=e320]
          - cell "FR10 test addr 1787764218138" [ref=e321]
          - cell "Đã hủy" [ref=e322]
          - cell [ref=e323]:
            - button "Đánh dấu Đã giao" [ref=e325] [cursor=pointer]
        - row [ref=e326]:
          - cell "#84" [ref=e327]
          - cell "Test User" [ref=e328]
          - cell "100,820 ₫" [ref=e329]
          - cell "FR10 test addr 1787764217867" [ref=e330]
          - cell "Đã hủy" [ref=e331]
          - cell [ref=e332]:
            - button "Đánh dấu Đã giao" [ref=e334] [cursor=pointer]
        - row [ref=e335]:
          - cell "#83" [ref=e336]
          - cell "Test User" [ref=e337]
          - cell "100,691 ₫" [ref=e338]
          - cell "FR10 test addr 1787764217662" [ref=e339]
          - cell "Đang giao" [ref=e340]
          - cell [ref=e341]:
            - button "Hoàn thành" [ref=e343] [cursor=pointer]
        - row [ref=e344]:
          - cell "#82" [ref=e345]
          - cell "Test User" [ref=e346]
          - cell "100,555 ₫" [ref=e347]
          - cell "FR10 test addr 1787764216546" [ref=e348]
          - cell "Đã giao" [ref=e349]
          - cell [ref=e350]
        - row [ref=e351]:
          - cell "#81" [ref=e352]
          - cell "Test User" [ref=e353]
          - cell "100,270 ₫" [ref=e354]
          - cell "FR10 test addr 1787764216351" [ref=e355]
          - cell "Đã giao" [ref=e356]
          - cell [ref=e357]
        - row [ref=e358]:
          - cell "#80" [ref=e359]
          - cell "Test User" [ref=e360]
          - cell "100,833 ₫" [ref=e361]
          - cell "FR10 test addr 1787764216155" [ref=e362]
          - cell "Đã xác nhận" [ref=e363]
          - cell [ref=e364]:
            - generic [ref=e365]:
              - button "Giao hàng" [ref=e366] [cursor=pointer]
              - button "Hủy" [ref=e367] [cursor=pointer]
        - row [ref=e368]:
          - cell "#79" [ref=e369]
          - cell "Test User" [ref=e370]
          - cell "100,677 ₫" [ref=e371]
          - cell "FR10 test addr 1787764215968" [ref=e372]
          - cell "Chờ xác nhận" [ref=e373]
          - cell [ref=e374]:
            - generic [ref=e375]:
              - button "Xác nhận" [ref=e376] [cursor=pointer]
              - button "Hủy" [ref=e377] [cursor=pointer]
        - row [ref=e378]:
          - cell "#78" [ref=e379]
          - cell "Test User" [ref=e380]
          - cell "100,360 ₫" [ref=e381]
          - cell "FR10 test addr 1787764215772" [ref=e382]
          - cell "Đã giao" [ref=e383]
          - cell [ref=e384]
        - row [ref=e385]:
          - cell "#77" [ref=e386]
          - cell "Test User" [ref=e387]
          - cell "100,231 ₫" [ref=e388]
          - cell "FR10 test addr 1787764215582" [ref=e389]
          - cell "Đang giao" [ref=e390]
          - cell [ref=e391]:
            - button "Hoàn thành" [ref=e393] [cursor=pointer]
        - row [ref=e394]:
          - cell "#76" [ref=e395]
          - cell "Test User" [ref=e396]
          - cell "100,686 ₫" [ref=e397]
          - cell "FR10 test addr 1787764215383" [ref=e398]
          - cell "Đã hủy" [ref=e399]
          - cell [ref=e400]:
            - button "Đánh dấu Đã giao" [ref=e402] [cursor=pointer]
        - row [ref=e403]:
          - cell "#75" [ref=e404]
          - cell "Test User" [ref=e405]
          - cell "100,966 ₫" [ref=e406]
          - cell "FR10 test addr 1787764215180" [ref=e407]
          - cell "Đã xác nhận" [ref=e408]
          - cell [ref=e409]:
            - generic [ref=e410]:
              - button "Giao hàng" [ref=e411] [cursor=pointer]
              - button "Hủy" [ref=e412] [cursor=pointer]
        - row [ref=e413]:
          - cell "#74" [ref=e414]
          - cell "Test User" [ref=e415]
          - cell "100,315 ₫" [ref=e416]
          - cell "FR10 test addr 1787764213307" [ref=e417]
          - cell "Đã xác nhận" [ref=e418]
          - cell [ref=e419]:
            - generic [ref=e420]:
              - button "Giao hàng" [ref=e421] [cursor=pointer]
              - button "Hủy" [ref=e422] [cursor=pointer]
        - row [ref=e423]:
          - cell "#73" [ref=e424]
          - cell "Test User" [ref=e425]
          - cell "100,941 ₫" [ref=e426]
          - cell "FR10 test addr 1787764212840" [ref=e427]
          - cell "Đã hủy" [ref=e428]
          - cell [ref=e429]:
            - button "Đánh dấu Đã giao" [ref=e431] [cursor=pointer]
        - row [ref=e432]:
          - cell "#72" [ref=e433]
          - cell "Test User" [ref=e434]
          - cell "100,540 ₫" [ref=e435]
          - cell "FR10 test addr 1787764212132" [ref=e436]
          - cell "Đã giao" [ref=e437]
          - cell [ref=e438]
        - row [ref=e439]:
          - cell "#71" [ref=e440]
          - cell "Test User" [ref=e441]
          - cell "100,817 ₫" [ref=e442]
          - cell "FR10 test addr 1787764205200" [ref=e443]
          - cell "Đang giao" [ref=e444]
          - cell [ref=e445]:
            - button "Hoàn thành" [ref=e447] [cursor=pointer]
        - row [ref=e448]:
          - cell "#70" [ref=e449]
          - cell "Test User" [ref=e450]
          - cell "100,890 ₫" [ref=e451]
          - cell "FR10 test addr 1787764204659" [ref=e452]
          - cell "Đã giao" [ref=e453]
          - cell [ref=e454]
        - row [ref=e455]:
          - cell "#69" [ref=e456]
          - cell "Test User" [ref=e457]
          - cell "100,371 ₫" [ref=e458]
          - cell "FR10 test addr 1787764203220" [ref=e459]
          - cell "Đã hủy" [ref=e460]
          - cell [ref=e461]:
            - button "Đánh dấu Đã giao" [ref=e463] [cursor=pointer]
        - row [ref=e464]:
          - cell "#68" [ref=e465]
          - cell "Test User" [ref=e466]
          - cell "100,438 ₫" [ref=e467]
          - cell "FR10 test addr 1787764202968" [ref=e468]
          - cell "Đã hủy" [ref=e469]
          - cell [ref=e470]:
            - button "Đánh dấu Đã giao" [ref=e472] [cursor=pointer]
        - row [ref=e473]:
          - cell "#67" [ref=e474]
          - cell "Test User" [ref=e475]
          - cell "100,606 ₫" [ref=e476]
          - cell "FR10 test addr 1787764202704" [ref=e477]
          - cell "Đã hủy" [ref=e478]
          - cell [ref=e479]:
            - button "Đánh dấu Đã giao" [ref=e481] [cursor=pointer]
        - row [ref=e482]:
          - cell "#66" [ref=e483]
          - cell "Test User" [ref=e484]
          - cell "100,200 ₫" [ref=e485]
          - cell "FR10 test addr 1787764202541" [ref=e486]
          - cell "Đang giao" [ref=e487]
          - cell [ref=e488]:
            - button "Hoàn thành" [ref=e490] [cursor=pointer]
        - row [ref=e491]:
          - cell "#65" [ref=e492]
          - cell "Test User" [ref=e493]
          - cell "100,324 ₫" [ref=e494]
          - cell "FR10 test addr 1787764200562" [ref=e495]
          - cell "Đã giao" [ref=e496]
          - cell [ref=e497]
        - row [ref=e498]:
          - cell "#64" [ref=e499]
          - cell "Test User" [ref=e500]
          - cell "100,198 ₫" [ref=e501]
          - cell "FR10 test addr 1787764200386" [ref=e502]
          - cell "Đã giao" [ref=e503]
          - cell [ref=e504]
        - row [ref=e505]:
          - cell "#63" [ref=e506]
          - cell "Test User" [ref=e507]
          - cell "100,394 ₫" [ref=e508]
          - cell "FR10 test addr 1787764200231" [ref=e509]
          - cell "Đã xác nhận" [ref=e510]
          - cell [ref=e511]:
            - generic [ref=e512]:
              - button "Giao hàng" [ref=e513] [cursor=pointer]
              - button "Hủy" [ref=e514] [cursor=pointer]
        - row [ref=e515]:
          - cell "#62" [ref=e516]
          - cell "Test User" [ref=e517]
          - cell "100,925 ₫" [ref=e518]
          - cell "FR10 test addr 1787764200060" [ref=e519]
          - cell "Chờ xác nhận" [ref=e520]
          - cell [ref=e521]:
            - generic [ref=e522]:
              - button "Xác nhận" [ref=e523] [cursor=pointer]
              - button "Hủy" [ref=e524] [cursor=pointer]
        - row [ref=e525]:
          - cell "#61" [ref=e526]
          - cell "Test User" [ref=e527]
          - cell "100,986 ₫" [ref=e528]
          - cell "FR10 test addr 1787764199898" [ref=e529]
          - cell "Đã giao" [ref=e530]
          - cell [ref=e531]
        - row [ref=e532]:
          - cell "#60" [ref=e533]
          - cell "Test User" [ref=e534]
          - cell "100,941 ₫" [ref=e535]
          - cell "FR10 test addr 1787764199740" [ref=e536]
          - cell "Đang giao" [ref=e537]
          - cell [ref=e538]:
            - button "Hoàn thành" [ref=e540] [cursor=pointer]
        - row [ref=e541]:
          - cell "#59" [ref=e542]
          - cell "Test User" [ref=e543]
          - cell "100,045 ₫" [ref=e544]
          - cell "FR10 test addr 1787764199436" [ref=e545]
          - cell "Đã hủy" [ref=e546]
          - cell [ref=e547]:
            - button "Đánh dấu Đã giao" [ref=e549] [cursor=pointer]
        - row [ref=e550]:
          - cell "#58" [ref=e551]
          - cell "Test User" [ref=e552]
          - cell "100,700 ₫" [ref=e553]
          - cell "FR10 test addr 1787764199163" [ref=e554]
          - cell "Đã xác nhận" [ref=e555]
          - cell [ref=e556]:
            - generic [ref=e557]:
              - button "Giao hàng" [ref=e558] [cursor=pointer]
              - button "Hủy" [ref=e559] [cursor=pointer]
        - row [ref=e560]:
          - cell "#57" [ref=e561]
          - cell "Test User" [ref=e562]
          - cell "100,658 ₫" [ref=e563]
          - cell "FR10 test addr 1787764197099" [ref=e564]
          - cell "Đã xác nhận" [ref=e565]
          - cell [ref=e566]:
            - generic [ref=e567]:
              - button "Giao hàng" [ref=e568] [cursor=pointer]
              - button "Hủy" [ref=e569] [cursor=pointer]
        - row [ref=e570]:
          - cell "#56" [ref=e571]
          - cell "Test User" [ref=e572]
          - cell "100,719 ₫" [ref=e573]
          - cell "FR10 test addr 1787764196804" [ref=e574]
          - cell "Đã hủy" [ref=e575]
          - cell [ref=e576]:
            - button "Đánh dấu Đã giao" [ref=e578] [cursor=pointer]
        - row [ref=e579]:
          - cell "#55" [ref=e580]
          - cell "Test User" [ref=e581]
          - cell "100,380 ₫" [ref=e582]
          - cell "FR10 test addr 1787764196517" [ref=e583]
          - cell "Đã giao" [ref=e584]
          - cell [ref=e585]
        - row [ref=e586]:
          - cell "#54" [ref=e587]
          - cell "Test User" [ref=e588]
          - cell "100,407 ₫" [ref=e589]
          - cell "FR10 test addr 1787764190751" [ref=e590]
          - cell "Đang giao" [ref=e591]
          - cell [ref=e592]:
            - button "Hoàn thành" [ref=e594] [cursor=pointer]
        - row [ref=e595]:
          - cell "#53" [ref=e596]
          - cell "Test User" [ref=e597]
          - cell "100,669 ₫" [ref=e598]
          - cell "FR10 test addr 1787764190579" [ref=e599]
          - cell "Đã giao" [ref=e600]
          - cell [ref=e601]
        - row [ref=e602]:
          - cell "#52" [ref=e603]
          - cell "Test User" [ref=e604]
          - cell "100,071 ₫" [ref=e605]
          - cell "FR10 test addr 1787764190133" [ref=e606]
          - cell "Đã hủy" [ref=e607]
          - cell [ref=e608]:
            - button "Đánh dấu Đã giao" [ref=e610] [cursor=pointer]
        - row [ref=e611]:
          - cell "#51" [ref=e612]
          - cell "Test User" [ref=e613]
          - cell "100,476 ₫" [ref=e614]
          - cell "FR10 test addr 1787764189983" [ref=e615]
          - cell "Đã hủy" [ref=e616]
          - cell [ref=e617]:
            - button "Đánh dấu Đã giao" [ref=e619] [cursor=pointer]
        - row [ref=e620]:
          - cell "#50" [ref=e621]
          - cell "Test User" [ref=e622]
          - cell "100,439 ₫" [ref=e623]
          - cell "FR10 test addr 1787764189844" [ref=e624]
          - cell "Đã hủy" [ref=e625]
          - cell [ref=e626]:
            - button "Đánh dấu Đã giao" [ref=e628] [cursor=pointer]
        - row [ref=e629]:
          - cell "#49" [ref=e630]
          - cell "Test User" [ref=e631]
          - cell "100,744 ₫" [ref=e632]
          - cell "FR10 test addr 1787764189770" [ref=e633]
          - cell "Đang giao" [ref=e634]
          - cell [ref=e635]:
            - button "Hoàn thành" [ref=e637] [cursor=pointer]
        - row [ref=e638]:
          - cell "#48" [ref=e639]
          - cell "Test User" [ref=e640]
          - cell "100,327 ₫" [ref=e641]
          - cell "FR10 test addr 1787764189188" [ref=e642]
          - cell "Đã giao" [ref=e643]
          - cell [ref=e644]
        - row [ref=e645]:
          - cell "#47" [ref=e646]
          - cell "Test User" [ref=e647]
          - cell "100,538 ₫" [ref=e648]
          - cell "FR10 test addr 1787764189121" [ref=e649]
          - cell "Đã giao" [ref=e650]
          - cell [ref=e651]
        - row [ref=e652]:
          - cell "#46" [ref=e653]
          - cell "Test User" [ref=e654]
          - cell "100,555 ₫" [ref=e655]
          - cell "FR10 test addr 1787764189054" [ref=e656]
          - cell "Đã xác nhận" [ref=e657]
          - cell [ref=e658]:
            - generic [ref=e659]:
              - button "Giao hàng" [ref=e660] [cursor=pointer]
              - button "Hủy" [ref=e661] [cursor=pointer]
        - row [ref=e662]:
          - cell "#45" [ref=e663]
          - cell "Test User" [ref=e664]
          - cell "100,323 ₫" [ref=e665]
          - cell "FR10 test addr 1787764188992" [ref=e666]
          - cell "Chờ xác nhận" [ref=e667]
          - cell [ref=e668]:
            - generic [ref=e669]:
              - button "Xác nhận" [ref=e670] [cursor=pointer]
              - button "Hủy" [ref=e671] [cursor=pointer]
        - row [ref=e672]:
          - cell "#44" [ref=e673]
          - cell "Test User" [ref=e674]
          - cell "100,939 ₫" [ref=e675]
          - cell "FR10 test addr 1787764188913" [ref=e676]
          - cell "Đã giao" [ref=e677]
          - cell [ref=e678]
        - row [ref=e679]:
          - cell "#43" [ref=e680]
          - cell "Test User" [ref=e681]
          - cell "100,309 ₫" [ref=e682]
          - cell "FR10 test addr 1787764188847" [ref=e683]
          - cell "Đang giao" [ref=e684]
          - cell [ref=e685]:
            - button "Hoàn thành" [ref=e687] [cursor=pointer]
        - row [ref=e688]:
          - cell "#42" [ref=e689]
          - cell "Test User" [ref=e690]
          - cell "100,248 ₫" [ref=e691]
          - cell "FR10 test addr 1787764188785" [ref=e692]
          - cell "Đã hủy" [ref=e693]
          - cell [ref=e694]:
            - button "Đánh dấu Đã giao" [ref=e696] [cursor=pointer]
        - row [ref=e697]:
          - cell "#41" [ref=e698]
          - cell "Test User" [ref=e699]
          - cell "100,317 ₫" [ref=e700]
          - cell "FR10 test addr 1787764188702" [ref=e701]
          - cell "Đã xác nhận" [ref=e702]
          - cell [ref=e703]:
            - generic [ref=e704]:
              - button "Giao hàng" [ref=e705] [cursor=pointer]
              - button "Hủy" [ref=e706] [cursor=pointer]
        - row [ref=e707]:
          - cell "#40" [ref=e708]
          - cell "Test User" [ref=e709]
          - cell "50,000 ₫" [ref=e710]
          - cell "Chưa cập nhật" [ref=e711]
          - cell "Chờ xác nhận" [ref=e712]
          - cell [ref=e713]:
            - generic [ref=e714]:
              - button "Xác nhận" [ref=e715] [cursor=pointer]
              - button "Hủy" [ref=e716] [cursor=pointer]
        - row [ref=e717]:
          - cell "#39" [ref=e718]
          - cell "Test User" [ref=e719]
          - cell "50,000 ₫" [ref=e720]
          - cell "123 Duong ABC Q1" [ref=e721]
          - cell "Chờ xác nhận" [ref=e722]
          - cell [ref=e723]:
            - generic [ref=e724]:
              - button "Xác nhận" [ref=e725] [cursor=pointer]
              - button "Hủy" [ref=e726] [cursor=pointer]
        - row [ref=e727]:
          - cell "#38" [ref=e728]
          - cell "Test User" [ref=e729]
          - cell "50,000 ₫" [ref=e730]
          - cell [ref=e731]
          - cell "Chờ xác nhận" [ref=e733]
          - cell [ref=e734]:
            - generic [ref=e735]:
              - button "Xác nhận" [ref=e736] [cursor=pointer]
              - button "Hủy" [ref=e737] [cursor=pointer]
        - row [ref=e738]:
          - cell "#37" [ref=e739]
          - cell "Test User" [ref=e740]
          - cell "100,000 ₫" [ref=e741]
          - cell "FR18 test addr 1787764003759" [ref=e742]
          - cell "Đã giao" [ref=e743]
          - cell [ref=e744]
        - row [ref=e745]:
          - cell "#36" [ref=e746]
          - cell "Test User" [ref=e747]
          - cell "500,000 ₫" [ref=e748]
          - cell "FR18 test addr 1787764003067" [ref=e749]
          - cell "Đã giao" [ref=e750]
          - cell [ref=e751]
        - row [ref=e752]:
          - cell "#35" [ref=e753]
          - cell "Test User" [ref=e754]
          - cell "100,515 ₫" [ref=e755]
          - cell "FR18 test addr 1787764001312" [ref=e756]
          - cell "Đã giao" [ref=e757]
          - cell [ref=e758]
        - row [ref=e759]:
          - cell "#34" [ref=e760]
          - cell "Test User" [ref=e761]
          - cell "100,756 ₫" [ref=e762]
          - cell "FR18 test addr 1787763995606" [ref=e763]
          - cell "Đã hủy" [ref=e764]
          - cell [ref=e765]:
            - button "Đánh dấu Đã giao" [ref=e767] [cursor=pointer]
        - row [ref=e768]:
          - cell "#33" [ref=e769]
          - cell "Test User" [ref=e770]
          - cell "100,559 ₫" [ref=e771]
          - cell "FR18 test addr 1787763995354" [ref=e772]
          - cell "Đã giao" [ref=e773]
          - cell [ref=e774]
        - row [ref=e775]:
          - cell "#32" [ref=e776]
          - cell "Test User" [ref=e777]
          - cell "100,569 ₫" [ref=e778]
          - cell "FR18 test addr 1787763995096" [ref=e779]
          - cell "Đang giao" [ref=e780]
          - cell [ref=e781]:
            - button "Hoàn thành" [ref=e783] [cursor=pointer]
        - row [ref=e784]:
          - cell "#31" [ref=e785]
          - cell "Test User" [ref=e786]
          - cell "100,392 ₫" [ref=e787]
          - cell "FR18 test addr 1787763994840" [ref=e788]
          - cell "Đã xác nhận" [ref=e789]
          - cell [ref=e790]:
            - generic [ref=e791]:
              - button "Giao hàng" [ref=e792] [cursor=pointer]
              - button "Hủy" [ref=e793] [cursor=pointer]
        - row [ref=e794]:
          - cell "#30" [ref=e795]
          - cell "Test User" [ref=e796]
          - cell "100,185 ₫" [ref=e797]
          - cell "FR18 test addr 1787763994587" [ref=e798]
          - cell "Chờ xác nhận" [ref=e799]
          - cell [ref=e800]:
            - generic [ref=e801]:
              - button "Xác nhận" [ref=e802] [cursor=pointer]
              - button "Hủy" [ref=e803] [cursor=pointer]
        - row [ref=e804]:
          - cell "#29" [ref=e805]
          - cell "Test User" [ref=e806]
          - cell "50,000 ₫" [ref=e807]
          - cell "Chưa cập nhật" [ref=e808]
          - cell "Chờ xác nhận" [ref=e809]
          - cell [ref=e810]:
            - generic [ref=e811]:
              - button "Xác nhận" [ref=e812] [cursor=pointer]
              - button "Hủy" [ref=e813] [cursor=pointer]
        - row [ref=e814]:
          - cell "#28" [ref=e815]
          - cell "Test User" [ref=e816]
          - cell "50,000 ₫" [ref=e817]
          - cell "123 Duong ABC Q1" [ref=e818]
          - cell "Chờ xác nhận" [ref=e819]
          - cell [ref=e820]:
            - generic [ref=e821]:
              - button "Xác nhận" [ref=e822] [cursor=pointer]
              - button "Hủy" [ref=e823] [cursor=pointer]
        - row [ref=e824]:
          - cell "#27" [ref=e825]
          - cell "Test User" [ref=e826]
          - cell "50,000 ₫" [ref=e827]
          - cell [ref=e828]
          - cell "Chờ xác nhận" [ref=e830]
          - cell [ref=e831]:
            - generic [ref=e832]:
              - button "Xác nhận" [ref=e833] [cursor=pointer]
              - button "Hủy" [ref=e834] [cursor=pointer]
        - row [ref=e835]:
          - cell "#26" [ref=e836]
          - cell "Test User" [ref=e837]
          - cell "100,050 ₫" [ref=e838]
          - cell "FR18 test addr 1787763973954" [ref=e839]
          - cell "Đã giao" [ref=e840]
          - cell [ref=e841]
        - row [ref=e842]:
          - cell "#25" [ref=e843]
          - cell "Test User" [ref=e844]
          - cell "100,983 ₫" [ref=e845]
          - cell "FR18 test addr 1787763968289" [ref=e846]
          - cell "Đã hủy" [ref=e847]
          - cell [ref=e848]:
            - button "Đánh dấu Đã giao" [ref=e850] [cursor=pointer]
        - row [ref=e851]:
          - cell "#24" [ref=e852]
          - cell "Test User" [ref=e853]
          - cell "100,672 ₫" [ref=e854]
          - cell "FR18 test addr 1787763968047" [ref=e855]
          - cell "Đã giao" [ref=e856]
          - cell [ref=e857]
        - row [ref=e858]:
          - cell "#23" [ref=e859]
          - cell "Test User" [ref=e860]
          - cell "100,835 ₫" [ref=e861]
          - cell "FR18 test addr 1787763967808" [ref=e862]
          - cell "Đang giao" [ref=e863]
          - cell [ref=e864]:
            - button "Hoàn thành" [ref=e866] [cursor=pointer]
        - row [ref=e867]:
          - cell "#22" [ref=e868]
          - cell "Test User" [ref=e869]
          - cell "100,777 ₫" [ref=e870]
          - cell "FR18 test addr 1787763967564" [ref=e871]
          - cell "Đã xác nhận" [ref=e872]
          - cell [ref=e873]:
            - generic [ref=e874]:
              - button "Giao hàng" [ref=e875] [cursor=pointer]
              - button "Hủy" [ref=e876] [cursor=pointer]
        - row [ref=e877]:
          - cell "#21" [ref=e878]
          - cell "Test User" [ref=e879]
          - cell "100,767 ₫" [ref=e880]
          - cell "FR18 test addr 1787763967320" [ref=e881]
          - cell "Chờ xác nhận" [ref=e882]
          - cell [ref=e883]:
            - generic [ref=e884]:
              - button "Xác nhận" [ref=e885] [cursor=pointer]
              - button "Hủy" [ref=e886] [cursor=pointer]
        - row [ref=e887]:
          - cell "#20" [ref=e888]
          - cell "Test User" [ref=e889]
          - cell "333,000 ₫" [ref=e890]
          - cell "B3 API evidence" [ref=e891]
          - cell "Đã hủy" [ref=e892]
          - cell [ref=e893]:
            - button "Đánh dấu Đã giao" [ref=e895] [cursor=pointer]
        - row [ref=e896]:
          - cell "#19" [ref=e897]
          - cell "Test User" [ref=e898]
          - cell "222,000 ₫" [ref=e899]
          - cell "B3 evidence" [ref=e900]
          - cell "Đã hủy" [ref=e901]
          - cell [ref=e902]:
            - button "Đánh dấu Đã giao" [ref=e904] [cursor=pointer]
        - row [ref=e905]:
          - cell "#18" [ref=e906]
          - cell "Test User" [ref=e907]
          - cell "111,000 ₫" [ref=e908]
          - cell "B1 evidence" [ref=e909]
          - cell "Đã hủy" [ref=e910]
          - cell [ref=e911]:
            - button "Đánh dấu Đã giao" [ref=e913] [cursor=pointer]
        - row [ref=e914]:
          - cell "#17" [ref=e915]
          - cell "Test User" [ref=e916]
          - cell "100,153 ₫" [ref=e917]
          - cell "FR10 test addr 1787763413950" [ref=e918]
          - cell "Đã xác nhận" [ref=e919]
          - cell [ref=e920]:
            - generic [ref=e921]:
              - button "Giao hàng" [ref=e922] [cursor=pointer]
              - button "Hủy" [ref=e923] [cursor=pointer]
        - row [ref=e924]:
          - cell "#16" [ref=e925]
          - cell "Test User" [ref=e926]
          - cell "100,400 ₫" [ref=e927]
          - cell "FR10 test addr 1787763413664" [ref=e928]
          - cell "Đã hủy" [ref=e929]
          - cell [ref=e930]:
            - button "Đánh dấu Đã giao" [ref=e932] [cursor=pointer]
        - row [ref=e933]:
          - cell "#15" [ref=e934]
          - cell "Test User" [ref=e935]
          - cell "100,220 ₫" [ref=e936]
          - cell "FR10 test addr 1787763413349" [ref=e937]
          - cell "Đã giao" [ref=e938]
          - cell [ref=e939]
        - row [ref=e940]:
          - cell "#14" [ref=e941]
          - cell "Test User" [ref=e942]
          - cell "100,081 ₫" [ref=e943]
          - cell "FR10 test addr 1787763407638" [ref=e944]
          - cell "Đang giao" [ref=e945]
          - cell [ref=e946]:
            - button "Hoàn thành" [ref=e948] [cursor=pointer]
        - row [ref=e949]:
          - cell "#13" [ref=e950]
          - cell "Test User" [ref=e951]
          - cell "100,605 ₫" [ref=e952]
          - cell "FR10 test addr 1787763407478" [ref=e953]
          - cell "Đã giao" [ref=e954]
          - cell [ref=e955]
        - row [ref=e956]:
          - cell "#12" [ref=e957]
          - cell "Test User" [ref=e958]
          - cell "100,890 ₫" [ref=e959]
          - cell "FR10 test addr 1787763407069" [ref=e960]
          - cell "Đã hủy" [ref=e961]
          - cell [ref=e962]:
            - button "Đánh dấu Đã giao" [ref=e964] [cursor=pointer]
        - row [ref=e965]:
          - cell "#11" [ref=e966]
          - cell "Test User" [ref=e967]
          - cell "100,980 ₫" [ref=e968]
          - cell "FR10 test addr 1787763406917" [ref=e969]
          - cell "Đã hủy" [ref=e970]
          - cell [ref=e971]:
            - button "Đánh dấu Đã giao" [ref=e973] [cursor=pointer]
        - row [ref=e974]:
          - cell "#10" [ref=e975]
          - cell "Test User" [ref=e976]
          - cell "100,257 ₫" [ref=e977]
          - cell "FR10 test addr 1787763406775" [ref=e978]
          - cell "Đã hủy" [ref=e979]
          - cell [ref=e980]:
            - button "Đánh dấu Đã giao" [ref=e982] [cursor=pointer]
        - row [ref=e983]:
          - cell "#9" [ref=e984]
          - cell "Test User" [ref=e985]
          - cell "100,018 ₫" [ref=e986]
          - cell "FR10 test addr 1787763406701" [ref=e987]
          - cell "Đang giao" [ref=e988]
          - cell [ref=e989]:
            - button "Hoàn thành" [ref=e991] [cursor=pointer]
        - row [ref=e992]:
          - cell "#8" [ref=e993]
          - cell "Test User" [ref=e994]
          - cell "100,294 ₫" [ref=e995]
          - cell "FR10 test addr 1787763406083" [ref=e996]
          - cell "Đã giao" [ref=e997]
          - cell [ref=e998]
        - row [ref=e999]:
          - cell "#7" [ref=e1000]
          - cell "Test User" [ref=e1001]
          - cell "100,760 ₫" [ref=e1002]
          - cell "FR10 test addr 1787763406014" [ref=e1003]
          - cell "Đã giao" [ref=e1004]
          - cell [ref=e1005]
        - row [ref=e1006]:
          - cell "#6" [ref=e1007]
          - cell "Test User" [ref=e1008]
          - cell "100,095 ₫" [ref=e1009]
          - cell "FR10 test addr 1787763405943" [ref=e1010]
          - cell "Đã xác nhận" [ref=e1011]
          - cell [ref=e1012]:
            - generic [ref=e1013]:
              - button "Giao hàng" [ref=e1014] [cursor=pointer]
              - button "Hủy" [ref=e1015] [cursor=pointer]
        - row [ref=e1016]:
          - cell "#5" [ref=e1017]
          - cell "Test User" [ref=e1018]
          - cell "100,809 ₫" [ref=e1019]
          - cell "FR10 test addr 1787763405878" [ref=e1020]
          - cell "Chờ xác nhận" [ref=e1021]
          - cell [ref=e1022]:
            - generic [ref=e1023]:
              - button "Xác nhận" [ref=e1024] [cursor=pointer]
              - button "Hủy" [ref=e1025] [cursor=pointer]
        - row [ref=e1026]:
          - cell "#4" [ref=e1027]
          - cell "Test User" [ref=e1028]
          - cell "100,478 ₫" [ref=e1029]
          - cell "FR10 test addr 1787763405793" [ref=e1030]
          - cell "Đã giao" [ref=e1031]
          - cell [ref=e1032]
        - row [ref=e1033]:
          - cell "#3" [ref=e1034]
          - cell "Test User" [ref=e1035]
          - cell "100,147 ₫" [ref=e1036]
          - cell "FR10 test addr 1787763405703" [ref=e1037]
          - cell "Đang giao" [ref=e1038]
          - cell [ref=e1039]:
            - button "Hoàn thành" [ref=e1041] [cursor=pointer]
        - row [ref=e1042]:
          - cell "#2" [ref=e1043]
          - cell "Test User" [ref=e1044]
          - cell "100,523 ₫" [ref=e1045]
          - cell "FR10 test addr 1787763405631" [ref=e1046]
          - cell "Đã hủy" [ref=e1047]
          - cell [ref=e1048]:
            - button "Đánh dấu Đã giao" [ref=e1050] [cursor=pointer]
        - row [ref=e1051]:
          - cell "#1" [ref=e1052]
          - cell "Test User" [ref=e1053]
          - cell "100,098 ₫" [ref=e1054]
          - cell "FR10 test addr 1787763405487" [ref=e1055]
          - cell "Đã xác nhận" [ref=e1056]
          - cell [ref=e1057]:
            - generic [ref=e1058]:
              - button "Giao hàng" [ref=e1059] [cursor=pointer]
              - button "Hủy" [ref=e1060] [cursor=pointer]
```

# Test source

```ts
  162 |           expected,
  163 |         });
  164 |       } else if (channel === 'ui_xss') {
  165 |         await runXssCase(page, request, {
  166 |           addressRaw: row.shipping_address,
  167 |           expected,
  168 |         });
  169 |       } else if (channel === 'api_admin') {
  170 |         await runApiCase(page, request, expected);
  171 |       } else {
  172 |         throw new Error(`Unknown channel: ${channel}`);
  173 |       }
  174 |     });
  175 |   }
  176 | });
  177 | 
  178 | async function runAccessCase(page: Page, expected: string): Promise<void> {
  179 |   const admin = new AdminPage(page);
  180 | 
  181 |   if (expected === 'access_login_form') {
  182 |     await admin.goto();
  183 |     // Pattern 1: visibility / text
  184 |     await expect(admin.loginHeading).toBeVisible();
  185 |     await expect(admin.loginHeading).toContainText('Admin Login');
  186 |     // Pattern 2: value / attribute
  187 |     await expect(admin.emailInput).toBeVisible();
  188 |     await expect(admin.loginButton).toBeEnabled();
  189 |     await expect(admin.brand).toHaveCount(0);
  190 |     return;
  191 |   }
  192 | 
  193 |   if (expected === 'access_non_admin') {
  194 |     await admin.goto();
  195 |     await admin.emailInput.fill(USER_CREDENTIALS.email);
  196 |     await admin.passwordInput.fill(USER_CREDENTIALS.password);
  197 |     const dialogPromise = page.waitForEvent('dialog', { timeout: 5000 });
  198 |     await admin.loginButton.click();
  199 |     const dialog = await dialogPromise;
  200 |     // Pattern 1: visibility / text (alert message)
  201 |     expect(dialog.message()).toMatch(/không phải là admin/i);
  202 |     await dialog.accept();
  203 |     // Pattern 2: still on login (no admin brand)
  204 |     await expect(admin.loginHeading).toBeVisible();
  205 |     await expect(admin.brand).toHaveCount(0);
  206 |     return;
  207 |   }
  208 | 
  209 |   throw new Error(`Unknown access expected_result: ${expected}`);
  210 | }
  211 | 
  212 | async function runOrdersUiCase(
  213 |   page: Page,
  214 |   request: APIRequestContext,
  215 |   opts: { startStatus: string; expected: string },
  216 | ): Promise<void> {
  217 |   const userToken = await loginApi(request, USER_CREDENTIALS);
  218 |   const adminToken = await loginApi(request, ADMIN_CREDENTIALS);
  219 |   const orderId = await createPendingOrder(request, userToken);
  220 |   await setOrderStatus(request, adminToken, orderId, opts.startStatus);
  221 | 
  222 |   await loginAsAdmin(page);
  223 |   const admin = new AdminPage(page);
  224 |   await admin.openOrdersTab();
  225 | 
  226 |   // Pattern 1: visibility / text
  227 |   await expect(admin.ordersHeading).toBeVisible();
  228 |   await expect(admin.orderRowById(orderId)).toBeVisible();
  229 | 
  230 |   // Pattern 2: navigation / enabled (admin SPA stays on root)
  231 |   await expect(admin.brand).toBeVisible();
  232 |   await expect(admin.ordersNav).toBeVisible();
  233 | 
  234 |   switch (opts.expected) {
  235 |     case 'btn_pending': {
  236 |       await expect(admin.confirmButton(orderId)).toBeVisible();
  237 |       await expect(admin.confirmButton(orderId)).toBeEnabled();
  238 |       await expect(admin.cancelButton(orderId)).toBeVisible();
  239 |       break;
  240 |     }
  241 |     case 'btn_confirmed': {
  242 |       await expect(admin.shipButton(orderId)).toBeVisible();
  243 |       await expect(admin.shipButton(orderId)).toBeEnabled();
  244 |       await expect(admin.cancelButton(orderId)).toBeVisible();
  245 |       break;
  246 |     }
  247 |     case 'btn_shipping': {
  248 |       await expect(admin.completeButton(orderId)).toBeVisible();
  249 |       await expect(admin.completeButton(orderId)).toBeEnabled();
  250 |       await expect(admin.confirmButton(orderId)).toHaveCount(0);
  251 |       break;
  252 |     }
  253 |     case 'btn_delivered_none': {
  254 |       await expect(admin.actionCell(orderId).getByRole('button')).toHaveCount(0);
  255 |       break;
  256 |     }
  257 |     case 'bug_c4_btn_hidden': {
  258 |       // Business: canceled is terminal → no action buttons (BUG-C4 if present)
  259 |       await expect(
  260 |         admin.markDeliveredFromCanceledButton(orderId),
  261 |         'BUG-C4: canceled order must not show Đánh dấu Đã giao',
> 262 |       ).toHaveCount(0);
      |         ^ Error: BUG-C4: canceled order must not show Đánh dấu Đã giao
  263 |       break;
  264 |     }
  265 |     case 'bug_c4_click_reject': {
  266 |       const btn = admin.markDeliveredFromCanceledButton(orderId);
  267 |       // Document defect path: button exists due to BUG-C4; clicking must not succeed
  268 |       await expect(btn).toBeVisible();
  269 |       await btn.click();
  270 |       await page.waitForTimeout(800);
  271 |       // Pattern 3: HTTP / API — status must remain canceled
  272 |       const after = await getOrder(request, orderId);
  273 |       expect(
  274 |         after.status,
  275 |         'BUG-C4/B1: canceled→delivered must be rejected; status stay canceled',
  276 |       ).toBe('canceled');
  277 |       break;
  278 |     }
  279 |     default:
  280 |       throw new Error(`Unknown orders expected_result: ${opts.expected}`);
  281 |   }
  282 | }
  283 | 
  284 | async function runDashboardCase(
  285 |   page: Page,
  286 |   request: APIRequestContext,
  287 |   opts: { startStatus: string; totalAmount: number; expected: string },
  288 | ): Promise<void> {
  289 |   await loginAsAdmin(page);
  290 |   const admin = new AdminPage(page);
  291 |   await admin.openDashboard();
  292 | 
  293 |   // Pattern 1: visibility / text
  294 |   await expect(admin.dashboardHeading).toBeVisible();
  295 |   await expect(admin.dashboardHeading).toContainText('Dashboard');
  296 | 
  297 |   if (opts.expected === 'dash_order_count') {
  298 |     const adminToken = await loginApi(request, ADMIN_CREDENTIALS);
  299 |     const apiCount = await getAdminOrdersCount(request, adminToken);
  300 |     // Pattern 2: value
  301 |     const uiCount = await admin.parseOrderCount();
  302 |     expect(uiCount).toBe(apiCount);
  303 |     return;
  304 |   }
  305 | 
  306 |   if (opts.expected === 'bug_c1_revenue') {
  307 |     const before = await admin.parseRevenue();
  308 |     const userToken = await loginApi(request, USER_CREDENTIALS);
  309 |     const adminToken = await loginApi(request, ADMIN_CREDENTIALS);
  310 |     const orderId = await createPendingOrder(request, userToken, {
  311 |       total_amount: opts.totalAmount,
  312 |     });
  313 |     await setOrderStatus(request, adminToken, orderId, 'delivered');
  314 | 
  315 |     // Re-login to refresh dashboard data from API
  316 |     await page.evaluate(() => localStorage.removeItem('adminToken'));
  317 |     await loginAsAdmin(page);
  318 |     await admin.openDashboard();
  319 | 
  320 |     const after = await admin.parseRevenue();
  321 |     const delta = after - before;
  322 |     // Pattern 2: value — business expects +totalAmount (BUG-C1 if ×2)
  323 |     expect(
  324 |       delta,
  325 |       `BUG-C1: revenue delta should be ${opts.totalAmount}, got ${delta} (order #${orderId})`,
  326 |     ).toBe(opts.totalAmount);
  327 |     return;
  328 |   }
  329 | 
  330 |   throw new Error(`Unknown dashboard expected_result: ${opts.expected}`);
  331 | }
  332 | 
  333 | async function runXssCase(
  334 |   page: Page,
  335 |   request: APIRequestContext,
  336 |   opts: { addressRaw: string; expected: string },
  337 | ): Promise<void> {
  338 |   const address = expandAddress(opts.addressRaw);
  339 |   const userToken = await loginApi(request, USER_CREDENTIALS);
  340 |   const adminToken = await loginApi(request, ADMIN_CREDENTIALS);
  341 |   const orderId = await createPendingOrder(request, userToken, {
  342 |     shipping_address: address,
  343 |     total_amount: 50000,
  344 |   });
  345 | 
  346 |   await loginAsAdmin(page);
  347 |   const admin = new AdminPage(page);
  348 |   await admin.openOrdersTab();
  349 | 
  350 |   // Pattern 1: visibility
  351 |   await expect(admin.orderRowById(orderId)).toBeVisible();
  352 |   const cell = admin.addressCell(orderId);
  353 | 
  354 |   switch (opts.expected) {
  355 |     case 'addr_plain_ok': {
  356 |       await expect(cell).toContainText('123 Duong ABC Q1');
  357 |       await expect(cell.locator('img')).toHaveCount(0);
  358 |       break;
  359 |     }
  360 |     case 'addr_null_fallback': {
  361 |       await expect(cell).toContainText('Chưa cập nhật');
  362 |       break;
```