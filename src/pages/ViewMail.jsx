import { TrashIcon } from "@heroicons/react/24/outline";
import parse from 'html-react-parser';

export default function ViewMail() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  shadow-md  rounded-lg mt-14">
        <h1 className=" font-semibold text-xl">
          Your MongoDB Atlas M0 cluster will be automatically paused in 7 days
        </h1>

        <div className="flex justify-between mt-4 ">
          <div className="flex space-x-4 justify-between w-full">
            <div className="flex items-center space-x-2">
              <img
                src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <p className="text-gray-500">MongoDB Atlas</p>
              <p className="text-gray-500">&lt;mongodb-atlas@mongodb.com&gt;</p>
            </div>
            <div className=" flex items-center space-x-2">
              {/* // time  */}
              <p className="text-gray-500">21:44</p>
              {/* // trash icon */}
              <TrashIcon className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <div className="text-gray-500">
            {
                parse(`<h1 style="text-align: center;"><span style="color: #e03e2d;"><strong>Intoduction</strong></span></h1>
                <p>&nbsp;</p>
                <p><span><strong>The&nbsp;<a title="Siege of Gu&icirc;nes (1352)" href="https://en.wikipedia.org/wiki/Siege_of_Gu%C3%AEnes_(1352)">siege of Gu&icirc;nes</a>&nbsp;took place from May to July&nbsp;1352 when a French army under&nbsp;<a title="Geoffroi de Charny" href="https://en.wikipedia.org/wiki/Geoffroi_de_Charny">Geoffrey de Charny</a>&nbsp;unsuccessfully attempted to recapture the French castle&nbsp;<em>(pictured)</em>&nbsp;at&nbsp;<a title="Gu&icirc;nes" href="https://en.wikipedia.org/wiki/Gu%C3%AEnes">Gu&icirc;nes</a>&nbsp;which had been seized by the English the previous January. The siege was part of the&nbsp;<a title="Hundred Years' War" href="https://en.wikipedia.org/wiki/Hundred_Years%27_War">Hundred Years' War</a>&nbsp;and took place during the uneasy and ill-kept&nbsp;<a title="Truce of Calais" href="https://en.wikipedia.org/wiki/Truce_of_Calais">truce of Calais</a>. The strongly fortified castle had been taken by the English during a period of nominal truce and the English king,&nbsp;<a title="Edward III of England" href="https://en.wikipedia.org/wiki/Edward_III_of_England">Edward&nbsp;III</a>, decided to keep it. Charny led 4,500 men and retook the town but was unable to either recapture or&nbsp;<a title="Blockade" href="https://en.wikipedia.org/wiki/Blockade">blockade</a> the castle. After two months of fierce fighting, a large English night attack on the French camp inflicted a heavy defeat and the French withdrew.</strong></span></p>`)
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}
